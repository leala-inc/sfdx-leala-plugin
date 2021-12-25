/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as path from 'path';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { Connection, Messages, SfdxProject } from '@salesforce/core';
import { test, expect } from '@salesforce/command/lib/test';
import {
  ExecuteService,
  HumanReporter,
  // JUnitReporter,
  ResultFormat,
  // TestLevel,
  TestService,
} from '@salesforce/apex-node';
import { CodeCoverage } from '@salesforce/apex-node/lib/src/tests/codeCoverage';
import {
  executeAnonymousResponse,
  querySuitesResult,
  // testRunSimple,
  // runWithCoverage,
  runWithCoverageResult,
  // cliJsonResult,
  // cliWithCoverage,
  jsonWithCoverage,
  // jsonSyncResult,
  // rawSyncResult,
  // runWithFailures,
  // globalJsonWithCoverage,
  aggregateCodeCoverageResults,
} from './testData';

Messages.importMessagesDirectory(__dirname);

const SFDX_PROJECT_PATH = 'test-sfdx-project';
const TEST_USERNAME = 'test@example.com';
const projectPath = path.resolve(SFDX_PROJECT_PATH);
const sfdxProjectJson = {
  packageDirectories: [{ path: 'force-app', default: true }],
  namespace: '',
  sfdcLoginUrl: 'https://login.salesforce.com',
  sourceApiVersion: '53.0',
};

describe('leala:apex:test:sequence', () => {
  let sandboxStub: SinonSandbox;

  beforeEach(() => {
    sandboxStub = createSandbox();
    sandboxStub.stub(SfdxProject, 'resolve').returns(
      Promise.resolve({
        getPath: () => projectPath,
        resolveProjectConfig: () => sfdxProjectJson,
      } as unknown as SfdxProject)
    );
  });

  afterEach(() => {
    sandboxStub.restore();
  });

  test
    .stdout()
    .stderr()
    .command(['leala:apex:test:sequence'])
    .it('should be required resultformat flag', (ctx) => {
      expect(ctx.stdout).to.be.empty;
      expect(ctx.stderr).to.contain('Missing required flag');
      expect(ctx.stderr).to.contain('resultformat');
    });

  const currentTime = 20211224; // globalJsonWithCoverage.summary.testRunId

  const testPositive = test
    .withOrg({ username: TEST_USERNAME }, true)
    .loadConfig({ root: __dirname })
    .stub(process, 'cwd', () => projectPath)
    .stub(Date.prototype, 'getTime', () => currentTime)
    .do((ctx) => {
      ctx.mySpy = sandboxStub.spy(TestService.prototype, 'buildAsyncPayload');
      ctx.myStubExec = sandboxStub
        .stub(ExecuteService.prototype, 'executeAnonymous')
        .resolves(executeAnonymousResponse);
      ctx.myStubQuery = ctx.myStub1 = sandboxStub
        .stub(Connection.prototype, 'query')
        .resolves(querySuitesResult);
      ctx.myStubRunTest = sandboxStub
        .stub(TestService.prototype, 'runTestAsynchronous')
        .resolves(runWithCoverageResult);
      ctx.myStubGetCodeCov = sandboxStub
        .stub(CodeCoverage.prototype, 'getAggregateCodeCoverage')
        .resolves(aggregateCodeCoverageResults);
      ctx.myStubWrite = sandboxStub.stub(
        TestService.prototype,
        'writeResultFiles'
      );
    })
    .stdout()
    .stderr();

  testPositive
    .command([
      'leala:apex:test:sequence',
      '--resultformat',
      'human',
      '--type',
      'classes',
    ])
    .it('should display extract classes success messages', (ctx) => {
      const result = ctx.stdout;
      expect(result).to.not.be.empty;
      expect(result).to.contain('extract classes Successfully');
    });

  testPositive
    .command([
      'leala:apex:test:sequence',
      '--resultformat',
      'human',
      '--type',
      'suites',
    ])
    .it('should display extract suites success messages', (ctx) => {
      const result = ctx.stdout;
      expect(result).to.not.be.empty;
      expect(result).to.contain('extract suites Successfully');
    });

  testPositive
    .command([
      'leala:apex:test:sequence',
      '--resultformat',
      'human',
      '--type',
      'classes',
      '--outputdir',
      'path/to/dir',
    ])
    .it(
      'should create test-run-codecoverage file with correct content when code cov is specified',
      (ctx) => {
        const result = new HumanReporter().format(runWithCoverageResult, false);
        expect((ctx.myStubWrite as SinonStub).args[0]).to.deep.equal([
          runWithCoverageResult,
          {
            dirPath: `path/to/dir/${currentTime}`,
            fileInfos: [
              {
                filename: `test-result-${jsonWithCoverage.summary.testRunId}.json`,
                content: jsonWithCoverage,
              },
              {
                filename: 'test-result-codecoverage.json',
                content: jsonWithCoverage.coverage.coverage,
              },
              {
                filename: 'test-result.txt',
                content: result,
              },
            ],
            resultFormats: [ResultFormat.junit],
          },
        ]);
      }
    );
});
