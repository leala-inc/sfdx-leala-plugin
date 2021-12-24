import * as os from 'os';
import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Connection, Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import {
  CancellationTokenSource,
  TestLevel,
  TestService,
  TapReporter,
  JUnitReporter,
  HumanReporter,
  ExecuteService,
  ExecuteAnonymousResponse,
} from '@salesforce/apex-node';
import {
  ApexTestResultData,
  ApexTestRunResultStatus,
  TestResult,
  TestRunIdResult,
} from '@salesforce/apex-node/lib/src/tests/types';
import { CodeCoverage } from '@salesforce/apex-node/lib/src/tests/codeCoverage';
import { calculatePercentage } from '@salesforce/apex-node/lib/src/tests/utils';
import { getCurrentTime } from '@salesforce/apex-node/lib/src/utils';
import { buildOutputDirConfig, CliJsonFormat, JsonReporter } from '@salesforce/plugin-apex/lib/reporters';
import { colorSuccess, colorError, resultFormat, FAILURE_EXIT_CODE } from '@salesforce/plugin-apex/lib/utils';
import cli from 'cli-ux';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('@leala-inc/sfdx-leala-plugin', 'sequence');
// TODO: Can I load from other package plugins? Messages.loadMessages('@salesforce/plugin-apex', 'run') doesn't work.
const origRunMessages = Messages.loadMessages('@leala-inc/sfdx-leala-plugin', 'run.orig');

const scriptFilePath = __dirname + '/../../../../scripts/GetTestClassList.apex';

export default class Sequence extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(os.EOL);

  public static readonly flagsConfig: FlagsConfig = {
    type: flags.string({
      char: 'e',
      description: messages.getMessage('typeDescription'),
      longDescription: messages.getMessage('typeLongDescription'),
      default: 'classes',
      options: ['classes', 'suites'],
      required: true,
    }),
    size: flags.integer({
      char: 'z',
      description: messages.getMessage('sizeDescription'),
      default: 10,
      required: true,
    }),
    resultformat: flags.enum({
      char: 'r',
      description: origRunMessages.getMessage('resultFormatLongDescription'),
      options: resultFormat,
      required: true,
    }),
    outputdir: flags.string({
      char: 'd',
      description: origRunMessages.getMessage('outputDirectoryDescription'),
    }),
    wait: flags.string({
      char: 'w',
      description: origRunMessages.getMessage('waitDescription'),
    }),
    verbose: flags.builtin({
      description: origRunMessages.getMessage('verboseDescription'),
    }),
    detailedcoverage: flags.boolean({
      char: 'v',
      description: origRunMessages.getMessage('detailedCoverageDescription'),
    }),
  };

  protected static requiresUsername = true;
  protected static requiresProject = false;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  protected cancellationTokenSource: CancellationTokenSource = new CancellationTokenSource();

  public async run(): Promise<AnyJson> {
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();
    let targets: string[];
    switch (this.flags.type) {
      case 'classes':
        targets = await this.getTestClassesFromApex(conn);
        break;
      case 'suites':
        targets = await this.getTestSuites(conn);
        break;
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    this.ux.log(colorSuccess(`extract ${this.flags.type} Successfully`));

    const argumentList = this.separateArgument(targets);

    // strict progress
    interface OclifProgress {
      start(total: number, startValue?: number, payload?: Record<string, string>): void;
      update(current: number, payload?: Record<string, string>): void;
      stop(): void;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const bar: OclifProgress = cli.progress({
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      format: `PROGRESS | {bar} | {value}/{total} ${this.flags.type as string}`,
    });
    bar.start(targets.length, 0);
    const results = [];
    const testService = new TestService(conn);
    let result: TestResult | TestRunIdResult;
    const startTime = getCurrentTime();
    for (const [index, arg] of argumentList.entries()) {
      const payload = await testService.buildAsyncPayload(
        TestLevel.RunSpecifiedTests,
        null,
        this.flags.type === 'suites' ? null : arg,
        this.flags.type === 'suites' ? arg : null
      );
      const reporter = undefined;
      result = await testService.runTestAsynchronous(
        payload,
        true, // for aggregate covered class or trigger ids
        false, // for wait
        reporter,
        this.cancellationTokenSource.token
      );
      results.push(result);
      if (this.cancellationTokenSource.token.isCancellationRequested) {
        return null;
      }
      if (this.flags.outputdir) {
        const jsonOutput = this.formatResultInJson(result);
        const outputDirConfig = buildOutputDirConfig(
          result,
          jsonOutput,
          (this.flags.outputdir as string) + `/${startTime}`,
          this.flags.resultformat,
          this.flags.detailedcoverage,
          false // asynchronous
        );
        await testService.writeResultFiles(result, outputDirConfig);
      }

      bar.update(Math.min((index + 1) * this.flags.size, targets.length));
    }
    bar.stop();

    const totalTestResult = await this.getTotalTestResult(conn, results, startTime);
    if (this.flags.outputdir) {
      const jsonOutput = this.formatResultInJson(totalTestResult);
      const outputDirConfig = buildOutputDirConfig(
        totalTestResult,
        jsonOutput,
        this.flags.outputdir,
        this.flags.resultformat,
        this.flags.detailedcoverage,
        false // asynchronous
      );
      await testService.writeResultFiles(totalTestResult, outputDirConfig, true);
    }

    try {
      if (
        // eslint-disable-next-line no-prototype-builtins
        totalTestResult.hasOwnProperty('summary') &&
        totalTestResult.summary.outcome === ApexTestRunResultStatus.Failed
      ) {
        process.exitCode = FAILURE_EXIT_CODE;
      }

      switch (this.flags.resultformat) {
        case 'human':
          this.logHuman(totalTestResult, this.flags.detailedcoverage, this.flags.outputdir);
          break;
        case 'tap':
          this.logTap(totalTestResult);
          break;
        case 'junit':
          this.logJUnit(totalTestResult);
          break;
        case 'json':
          // when --json flag is specified, we should log CLI json format
          if (!this.flags.json) {
            this.ux.logJson({
              status: process.exitCode,
              result: this.formatResultInJson(totalTestResult),
            });
          }
          break;
      }
    } catch (e) {
      this.ux.logJson(totalTestResult);
      const msg = origRunMessages.getMessage('testResultProcessErr', [e]);
      this.ux.error(msg);
    }

    return this.formatResultInJson(totalTestResult) as AnyJson;
  }

  private async getTestClassesFromApex(conn: Connection): Promise<string[]> {
    const exec = new ExecuteService(conn);

    const execResult = await exec.executeAnonymous({
      apexFilePath: scriptFilePath,
    });

    if (execResult.success) {
      return this.extractTestClasses(execResult);
    } else {
      this.ux.log(this.formatErrorExecute(execResult));
      throw new SfdxError(messages.getMessage('anonymousExecuteError'));
    }
  }

  private async getTestSuites(conn: Connection): Promise<string[]> {
    const query = 'SELECT TestSuiteName FROM ApexTestSuite';

    interface ApexTestSuite {
      TestSuiteName: string;
    }
    const result = await conn.query<ApexTestSuite>(query);

    const targets: string[] = [];
    result.records.forEach((record) => {
      targets.push(record.TestSuiteName);
    });
    return targets;
  }

  private extractTestClasses(response: ExecuteAnonymousResponse): string[] {
    const targets: string[] = [];
    response.logs.split('\n').forEach((line) => {
      const group = /\|USER_DEBUG|.*\|DEBUG\|(.*)/.exec(line);
      if (group) {
        targets.push(group[1]);
      }
    });
    return targets;
  }

  private formatErrorExecute(response: ExecuteAnonymousResponse): string {
    let outputText = '';
    const diagnostic = response.diagnostic[0];

    if (!response.compiled) {
      outputText += colorError(`Error: Line: ${diagnostic.lineNumber}, Column: ${diagnostic.columnNumber}\n`);
      outputText += colorError(`Error: ${diagnostic.compileProblem}\n`);
    } else {
      outputText += colorSuccess('Compiled successfully.\n');
      outputText += colorError(`Error: ${diagnostic.exceptionMessage}\n`);
      outputText += colorError(`Error: ${diagnostic.exceptionStackTrace}\n`);
      outputText += `\n${response.logs}`;
    }
    return outputText;
  }

  private separateArgument(targetList: string[]): string[] {
    const argumentList: string[] = [];
    for (let i = 0; i < Math.ceil(targetList.length / this.flags.size); i++) {
      const start = i * this.flags.size;
      argumentList.push(targetList.slice(start, start + (this.flags.size as number)).join(','));
    }
    return argumentList;
  }

  private async getTotalTestResult(
    conn: Connection,
    testResults: TestResult[],
    startTime: number
  ): Promise<TestResult> {
    const codeCov = new CodeCoverage(conn);
    const { coveredApexClassIdSet, globalTestResult } = this.aggregateAsyncTestResults(conn, testResults, startTime);
    const { codeCoverageResults, totalLines, coveredLines } = await codeCov.getAggregateCodeCoverage(
      coveredApexClassIdSet
    );

    globalTestResult.summary.totalLines = totalLines;
    globalTestResult.summary.coveredLines = coveredLines;
    globalTestResult.summary.testRunCoverage = calculatePercentage(coveredLines, totalLines);
    globalTestResult.codecoverage = codeCoverageResults;

    return globalTestResult;
  }

  private aggregateAsyncTestResults(
    conn: Connection,
    testResults: TestResult[],
    startTime: number
  ): {
    coveredApexClassIdSet: Set<string>;
    globalTestResult: TestResult;
  } {
    const coveredApexClassIdSet = new Set<string>();
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    let testStartTime: string;
    let testExecutionTimeInMs = 0;
    let testTotalTimeInMs = 0;
    let commandTimeInMs = 0;
    let userId = '';
    const testRunIds = [];

    // Iterate over test results, format and add them as results.tests
    let globalTestResults: ApexTestResultData[] = [];
    for (const result of testResults) {
      globalTestResults = globalTestResults.concat(result.tests);
      passed += result.summary.passing;
      skipped += result.summary.skipped;
      failed += result.summary.failing;
      if (!testStartTime) testStartTime = result.summary.testStartTime;
      testExecutionTimeInMs += result.summary.testExecutionTimeInMs ?? 0;
      testTotalTimeInMs += result.summary.testTotalTimeInMs ?? 0;
      commandTimeInMs += result.summary.commandTimeInMs ?? 0;
      userId = result.summary.userId;
      testRunIds.push(result.summary.testRunId);

      result.codecoverage.forEach((perClassCoverage) => {
        coveredApexClassIdSet.add(perClassCoverage.apexId);
      });
    }
    let outcome: string;
    if (failed > 0) {
      outcome = ApexTestRunResultStatus.Failed;
    } else if (passed === 0) {
      outcome = ApexTestRunResultStatus.Skipped;
    } else {
      outcome = ApexTestRunResultStatus.Passed;
    }

    const globalTestResult: TestResult = {
      summary: {
        outcome,
        testsRan: globalTestResults.length,
        passing: passed,
        failing: failed,
        skipped,
        passRate: calculatePercentage(passed, globalTestResults.length),
        failRate: calculatePercentage(failed, globalTestResults.length),
        skipRate: calculatePercentage(skipped, globalTestResults.length),
        testStartTime,
        testExecutionTimeInMs,
        testTotalTimeInMs,
        commandTimeInMs,
        hostname: conn.instanceUrl,
        orgId: conn.getAuthInfoFields().orgId,
        username: conn.getUsername(),
        testRunId: `startTime-${startTime}`,
        userId,
      },
      tests: globalTestResults,
    };

    return { coveredApexClassIdSet, globalTestResult };
  }

  // original apex/test/run private method
  private logHuman(result: TestResult, detailedCoverage: boolean, outputDir: string): void {
    if (outputDir) {
      this.ux.log(origRunMessages.getMessage('outputDirHint', [outputDir]));
    }
    const humanReporter = new HumanReporter();
    const output = humanReporter.format(result, detailedCoverage);
    this.ux.log(output);
  }

  private logTap(result: TestResult): void {
    const reporter = new TapReporter();
    const hint = this.formatReportHint(result);
    this.ux.log(reporter.format(result, [hint]));
  }

  private logJUnit(result: TestResult): void {
    const reporter = new JUnitReporter();
    this.ux.log(reporter.format(result));
  }

  private formatResultInJson(result: TestResult | TestRunIdResult): CliJsonFormat | TestRunIdResult {
    try {
      const reporter = new JsonReporter();
      // eslint-disable-next-line no-prototype-builtins
      return result.hasOwnProperty('summary') ? reporter.format(result as TestResult) : (result as TestRunIdResult);
    } catch (e) {
      this.ux.logJson(result);
      const msg = origRunMessages.getMessage('testResultProcessErr', [e]);
      this.ux.error(msg);
      throw e;
    }
  }

  private formatReportHint(result: TestResult): string {
    let reportArgs = `-i ${result.summary.testRunId}`;
    if (this.flags.targetusername) {
      reportArgs += ` -u ${this.flags.targetusername as string}`;
    }
    const hint = origRunMessages.getMessage('apexTestReportFormatHint', [reportArgs]);
    return hint;
  }
}
