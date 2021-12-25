/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {
  ApexTestResultOutcome,
  ApexTestRunResultStatus,
  CodeCoverageResult,
  TestResult,
} from '@salesforce/apex-node';

export const rawSyncResult = {
  summary: {
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Passed',
    passing: 10,
    failing: 0,
    skipped: 0,
    passRate: '100%',
    skipRate: '0%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTimeInMs: 53,
    commandTimeInMs: 60,
    testTotalTimeInMs: 53,
    hostname: 'https://na139.salesforce.com',
    testRunId: '',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      id: '07Mxx00000ErgiHUAR',
      queueItemId: '709xx000001IlUMQA0',
      stackTrace: null,
      message: null,
      asyncApexJobId: '707xx0000AUS2gHQQT',
      methodName: 'testConfig',
      outcome: 'Pass',
      apexLogId: null,
      apexClass: {
        id: '01pxx00000NWwb3AAD',
        name: 'MyApexTests',
        namespacePrefix: null,
        fullName: 'MyApexTests',
      },
      runTime: 53,
      testTimestamp: '2020-08-25T00:48:02.000+0000',
      fullName: 'MyApexTests.testConfig',
    },
  ],
};

export const jsonSyncResult = {
  summary: {
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Passed',
    passing: 10,
    failing: 0,
    skipped: 0,
    passRate: '100%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTime: '53 ms',
    commandTime: '60 ms',
    testTotalTime: '53 ms',
    hostname: 'https://na139.salesforce.com',
    testRunId: '',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      Id: '07Mxx00000ErgiHUAR',
      QueueItemId: '709xx000001IlUMQA0',
      StackTrace: null,
      Message: null,
      AsyncApexJobId: '707xx0000AUS2gHQQT',
      MethodName: 'testConfig',
      Outcome: 'Pass',
      ApexClass: {
        Id: '01pxx00000NWwb3AAD',
        Name: 'MyApexTests',
        NamespacePrefix: null,
      },
      RunTime: 53,
      FullName: 'MyApexTests.testConfig',
    },
  ],
};

export const testRunSimple: TestResult = {
  summary: {
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    outcome: ApexTestRunResultStatus.Passed,
    passing: 1,
    failing: 0,
    skipped: 0,
    passRate: '100%',
    skipRate: '0%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTimeInMs: 53,
    commandTimeInMs: 60,
    testTotalTimeInMs: 53,
    hostname: 'https://na139.salesforce.com',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      id: '07Mxx00000ErgiHUAR',
      queueItemId: '709xx000001IlUMQA0',
      stackTrace: '',
      message: '',
      asyncApexJobId: '707xx0000AUS2gHQQT',
      methodName: 'testConfig',
      outcome: ApexTestResultOutcome.Pass,
      apexLogId: null,
      apexClass: {
        id: '01pxx00000NWwb3AAD',
        name: 'MyApexTests',
        namespacePrefix: '',
        fullName: 'MyApexTests',
      },
      runTime: 53,
      testTimestamp: '2020-08-25T00:48:02.000+0000',
      fullName: 'MyApexTests.testConfig',
    },
  ],
};

// export const runWithCoverage = {
//   summary: {
//     failRate: '0%',
//     numTestsRan: 1, // not exist
//     orgId: '00D4xx00000FH4IEAW',
//     outcome: 'Passed',
//     passing: 10,
//     failing: 0,
//     skipped: 0,
//     passRate: '100%',
//     skipRate: '0%',
//     testStartTime: '2020-08-25T00:48:02.000+0000',
//     testExecutionTimeInMs: 53,
//     commandTimeInMs: 60,
//     testTotalTimeInMs: 53,
//     hostname: 'https://na139.salesforce.com',
//     testRunId: '707xx0000AUS2gH',
//     userId: '005xx000000uEgSAAU',
//     username: 'test@example.com',
//     orgWideCoverage: '50%',
//     testRunCoverage: '80%',
//     coveredLines: 8,
//     totalLines: 10,
//   },
//   tests: [
//     {
//       id: '07Mxx00000ErgiHUAR',
//       queueItemId: '709xx000001IlUMQA0',
//       stackTrace: null,
//       message: null,
//       asyncApexJobId: '707xx0000AUS2gHQQT',
//       methodName: 'testConfig',
//       outcome: 'Pass',
//       apexLogId: null,
//       apexClass: {
//         id: '01pxx00000NWwb3AAD',
//         name: 'MyApexTests',
//         namespacePrefix: null,
//         fullName: 'MyApexTests',
//       },
//       runTime: 53,
//       testTimestamp: '2020-08-25T00:48:02.000+0000',
//       fullName: 'MyApexTests.testConfig',
//       perClassCoverage: [
//         {
//           apexTestClassId: '01pxx00000NnP2KQAV',
//           apexClassOrTriggerName: 'ApexClassExample',
//           apexClassOrTriggerId: '01pxx00000avcNeAAL',
//           apexTestMethodName: 'testAssignContains',
//           numLinesCovered: 1,
//           numLinesUncovered: 4,
//           percentage: '20%',
//           coverage: { coveredLines: [1], uncoveredLines: [2, 3, 4, 5] },
//         },
//       ],
//     },
//   ],
//   codecoverage: [
//     {
//       apexId: '01pxx00000NWwb3AAF',
//       name: 'testClass',
//       type: 'ApexClass',
//       numLinesCovered: 1,
//       numLinesUncovered: 4,
//       percentage: '20%',
//       coveredLines: [1],
//       uncoveredLines: [2, 3, 4, 5],
//     },
//   ],
// };

export const runWithCoverageResult: TestResult = {
  summary: {
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Passed',
    passing: 10,
    failing: 0,
    skipped: 0,
    passRate: '100%',
    skipRate: '0%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTimeInMs: 53,
    commandTimeInMs: 60,
    testTotalTimeInMs: 53,
    hostname: 'https://na139.salesforce.com',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
    orgWideCoverage: '50%',
    testRunCoverage: '80%',
    coveredLines: 8,
    totalLines: 10,
  },
  tests: [
    {
      id: '07Mxx00000ErgiHUAR',
      queueItemId: '709xx000001IlUMQA0',
      stackTrace: null,
      message: null,
      asyncApexJobId: '707xx0000AUS2gHQQT',
      methodName: 'testConfig',
      outcome: ApexTestResultOutcome.Pass,
      apexLogId: null,
      apexClass: {
        id: '01pxx00000NWwb3AAD',
        name: 'MyApexTests',
        namespacePrefix: null,
        fullName: 'MyApexTests',
      },
      runTime: 53,
      testTimestamp: '2020-08-25T00:48:02.000+0000',
      fullName: 'MyApexTests.testConfig',
      perClassCoverage: [
        {
          apexTestClassId: '01pxx00000NnP2KQAV',
          apexClassOrTriggerName: 'ApexClassExample',
          apexClassOrTriggerId: '01pxx00000avcNeAAL',
          apexTestMethodName: 'testAssignContains',
          numLinesCovered: 1,
          numLinesUncovered: 4,
          percentage: '20%',
          coverage: { coveredLines: [1], uncoveredLines: [2, 3, 4, 5] },
        },
      ],
    },
  ],
  codecoverage: [
    {
      apexId: '01pxx00000NWwb3AAF',
      name: 'testClass',
      type: 'ApexClass',
      numLinesCovered: 1,
      numLinesUncovered: 4,
      percentage: '20%',
      coveredLines: [1],
      uncoveredLines: [2, 3, 4, 5],
    },
  ],
};

export const runWithFailures = {
  summary: {
    failRate: '50%',
    testsRan: 2,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Failed',
    passing: 1,
    failing: 1,
    skipped: 0,
    passRate: '50%',
    skipRate: '0%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTimeInMs: 53,
    commandTimeInMs: 60,
    testTotalTimeInMs: 53,
    hostname: 'https://na139.salesforce.com',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      id: '07Mxx00000ErgiHUAR',
      queueItemId: '709xx000001IlUMQA0',
      stackTrace: 'Error running test',
      message: null,
      asyncApexJobId: '707xx0000AUS2gHQQT',
      methodName: 'testConfig',
      outcome: 'Fail',
      apexLogId: null,
      apexClass: {
        id: '01pxx00000NWwb3AAD',
        name: 'MyApexTests',
        namespacePrefix: null,
        fullName: 'MyApexTests',
      },
      runTime: 53,
      testTimestamp: '2020-08-25T00:48:02.000+0000',
      fullName: 'MyApexTests.testConfig',
    },
  ],
};

export const runWithMixed = {
  summary: {
    failRate: '33%',
    testsRan: 3,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Failed',
    passing: 1,
    failing: 1,
    skipped: 1,
    passRate: '33%',
    skipRate: '33%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTimeInMs: 53,
    commandTimeInMs: 60,
    testTotalTimeInMs: 53,
    hostname: 'https://na139.salesforce.com',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      id: '07Mxx00000ErgiHUAR',
      queueItemId: '709xx000001IlUMQA0',
      stackTrace: null,
      message: null,
      asyncApexJobId: '707xx0000AUS2gHQQT',
      methodName: 'testConfig',
      outcome: 'Skip',
      apexLogId: null,
      apexClass: {
        id: '01pxx00000NWwb3AAD',
        name: 'MyApexTests',
        namespacePrefix: null,
        fullName: 'MyApexTests',
      },
      runTime: null,
      testTimestamp: '2020-08-25T00:48:02.000+0000',
      fullName: 'MyApexTests.testConfig',
    },
  ],
};

export const mixedResult = {
  summary: {
    commandTime: '60 ms',
    failing: 1,
    hostname: 'https://na139.salesforce.com',
    passing: 1,
    skipped: 1,
    testTotalTime: '53 ms',
    failRate: '33%',
    testsRan: 3,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Failed',
    passRate: '33%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTime: '53 ms',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      Id: '07Mxx00000ErgiHUAR',
      QueueItemId: '709xx000001IlUMQA0',
      StackTrace: null,
      Message: null,
      AsyncApexJobId: '707xx0000AUS2gHQQT',
      MethodName: 'testConfig',
      Outcome: 'Skip',
      ApexClass: {
        Id: '01pxx00000NWwb3AAD',
        Name: 'MyApexTests',
        NamespacePrefix: null,
      },
      RunTime: null,
      FullName: 'MyApexTests.testConfig',
    },
  ],
};

export const failureResult = {
  summary: {
    commandTime: '60 ms',
    failing: 1,
    hostname: 'https://na139.salesforce.com',
    passing: 1,
    skipped: 0,
    testTotalTime: '53 ms',
    failRate: '50%',
    testsRan: 2,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Failed',
    passRate: '50%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTime: '53 ms',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      Id: '07Mxx00000ErgiHUAR',
      QueueItemId: '709xx000001IlUMQA0',
      StackTrace: 'Error running test',
      Message: null,
      AsyncApexJobId: '707xx0000AUS2gHQQT',
      MethodName: 'testConfig',
      Outcome: 'Fail',
      ApexClass: {
        Id: '01pxx00000NWwb3AAD',
        Name: 'MyApexTests',
        NamespacePrefix: null,
      },
      RunTime: 53,
      FullName: 'MyApexTests.testConfig',
    },
  ],
};

export const jsonResult = {
  summary: {
    commandTime: '60 ms',
    failing: 0,
    hostname: 'https://na139.salesforce.com',
    passing: 1,
    skipped: 0,
    testTotalTime: '53 ms',
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    outcome: 'Passed',
    passRate: '100%',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    testExecutionTime: '53 ms',
    testRunId: '707xx0000AUS2gH',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
  },
  tests: [
    {
      Id: '07Mxx00000ErgiHUAR',
      QueueItemId: '709xx000001IlUMQA0',
      StackTrace: '',
      Message: '',
      AsyncApexJobId: '707xx0000AUS2gHQQT',
      MethodName: 'testConfig',
      Outcome: 'Pass',
      ApexClass: {
        Id: '01pxx00000NWwb3AAD',
        Name: 'MyApexTests',
        NamespacePrefix: '',
      },
      RunTime: 53,
      FullName: 'MyApexTests.testConfig',
    },
  ],
};

export const jsonWithCoverage = {
  coverage: {
    coverage: [
      {
        coveredPercent: 20,
        id: '01pxx00000NWwb3AAF',
        lines: {
          1: 1,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        name: 'testClass',
        totalCovered: 1,
        totalLines: 5,
      },
    ],
    records: [
      {
        ApexClassOrTrigger: {
          Id: '01pxx00000avcNeAAL',
          Name: 'ApexClassExample',
        },
        ApexTestClass: {
          Id: '07Mxx00000ErgiHUAR',
          Name: 'MyApexTests',
        },
        Coverage: {
          coveredLines: [1],
          uncoveredLines: [2, 3, 4, 5],
        },
        NumLinesCovered: 1,
        NumLinesUncovered: 4,
        TestMethodName: 'testConfig',
      },
    ],
    summary: {
      orgWideCoverage: '50%',
      totalLines: 10,
      coveredLines: 8,
      testRunCoverage: '80%',
    },
  },
  summary: {
    commandTime: '60 ms',
    failing: 0,
    hostname: 'https://na139.salesforce.com',
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    orgWideCoverage: '50%',
    outcome: 'Passed',
    passRate: '100%',
    testExecutionTime: '53 ms',
    testRunId: '707xx0000AUS2gH',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
    passing: 10,
    skipped: 0,
    testTotalTime: '53 ms',
    testRunCoverage: '80%',
  },
  tests: [
    {
      ApexClass: {
        Id: '01pxx00000NWwb3AAD',
        Name: 'MyApexTests',
        NamespacePrefix: null,
      },
      AsyncApexJobId: '707xx0000AUS2gHQQT',
      FullName: 'MyApexTests.testConfig',
      Id: '07Mxx00000ErgiHUAR',
      Message: null,
      MethodName: 'testConfig',
      Outcome: 'Pass',
      QueueItemId: '709xx000001IlUMQA0',
      RunTime: 53,
      StackTrace: null,
    },
  ],
};

export const globalJsonWithCoverage = {
  coverage: {
    coverage: [
      {
        coveredPercent: 20,
        id: '01pxx00000NWwb3AAF',
        lines: {
          1: 1,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        name: 'testClass',
        totalCovered: 1,
        totalLines: 5,
      },
    ],
    records: [
      {
        ApexClassOrTrigger: {
          Id: '01pxx00000avcNeAAL',
          Name: 'ApexClassExample',
        },
        ApexTestClass: {
          Id: '07Mxx00000ErgiHUAR',
          Name: 'MyApexTests',
        },
        Coverage: {
          coveredLines: [1],
          uncoveredLines: [2, 3, 4, 5],
        },
        NumLinesCovered: 1,
        NumLinesUncovered: 4,
        TestMethodName: 'testConfig',
      },
    ],
    summary: {
      orgWideCoverage: '50%',
      totalLines: 10,
      coveredLines: 8,
      testRunCoverage: '80%',
    },
  },
  summary: {
    commandTime: '60 ms',
    failing: 0,
    hostname: 'https://na139.salesforce.com',
    failRate: '0%',
    testsRan: 1,
    orgId: '00D4xx00000FH4IEAW',
    orgWideCoverage: '50%',
    outcome: 'Passed',
    passRate: '100%',
    testExecutionTime: '53 ms',
    testRunId: '20211224',
    testStartTime: '2020-08-25T00:48:02.000+0000',
    userId: '005xx000000uEgSAAU',
    username: 'test@example.com',
    passing: 10,
    skipped: 0,
    testTotalTime: '53 ms',
    testRunCoverage: '80%',
  },
  tests: [
    {
      ApexClass: {
        Id: '01pxx00000NWwb3AAD',
        Name: 'MyApexTests',
        NamespacePrefix: null,
      },
      AsyncApexJobId: '707xx0000AUS2gHQQT',
      FullName: 'MyApexTests.testConfig',
      Id: '07Mxx00000ErgiHUAR',
      Message: null,
      MethodName: 'testConfig',
      Outcome: 'Pass',
      QueueItemId: '709xx000001IlUMQA0',
      RunTime: 53,
      StackTrace: null,
    },
  ],
};

export const cliJsonResult = {
  status: 0,
  result: jsonResult,
};

export const cliWithCoverage = {
  result: jsonWithCoverage,
  status: 0,
};
const log = `53.0 APEX_CODE,DEBUG;APEX_PROFILING,INFO
Execute Anonymous: // https://salesforce.stackexchange.com/questions/122870/how-to-get-a-list-of-test-classes-in-an-org
Execute Anonymous: Http http = new Http();
Execute Anonymous: HttpRequest request = new HttpRequest();
Execute Anonymous: request.setEndpoint(URL.getOrgDomainUrl().toExternalForm() + '/_ui/common/apex/test/ApexTestQueueServlet');
Execute Anonymous: request.setMethod('POST');
Execute Anonymous: request.setHeader('content-type', 'application/x-www-form-urlencoded');
Execute Anonymous: request.setHeader('cookie', 'sid=' + UserInfo.getSessionId());
Execute Anonymous: request.setBody('action=GET_TESTS');
Execute Anonymous: HttpResponse response = http.send(request);
Execute Anonymous: // Parse the JSON response
Execute Anonymous: if (response.getStatusCode() == 200) {
Execute Anonymous:     String body = response.getBody().replace('while(1);', '');
Execute Anonymous:     // Deserialize the JSON string into collections of primitive data types.
Execute Anonymous:     Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(body);
Execute Anonymous:     // Cast the values in the 'testClasses' key as a list
Execute Anonymous:     List<Object> testClasses = (List<Object>) results.get('testClasses');
Execute Anonymous:     for (Object testClass : testClasses) {
Execute Anonymous:         Map<String, Object> testClassRecord = (Map<String, Object>) testClass;
Execute Anonymous:         System.debug((String) testClassRecord.get('name'));
Execute Anonymous:     }
Execute Anonymous: }
18:35:01.42 (42399093)|EXECUTION_STARTED
18:35:01.42 (42417176)|CODE_UNIT_STARTED|[EXTERNAL]|execute_anonymous_apex
18:35:01.42 (724084022)|USER_DEBUG|[19]|DEBUG|AccountLoaderTest
18:35:01.42 (724134348)|USER_DEBUG|[19]|DEBUG|ContactLoaderTest
18:35:01.42 (726038057)|USER_DEBUG|[19]|DEBUG|OpportunityLoaderTest
18:35:01.729 (729435953)|CUMULATIVE_LIMIT_USAGE
18:35:01.729 (729435953)|LIMIT_USAGE_FOR_NS|(default)|
  Number of SOQL queries: 0 out of 100
  Number of query rows: 0 out of 50000
  Number of SOSL queries: 0 out of 20
  Number of DML statements: 0 out of 150
  Number of Publish Immediate DML: 0 out of 150
  Number of DML rows: 0 out of 10000
  Maximum CPU time: 0 out of 10000
  Maximum heap size: 0 out of 6000000
  Number of callouts: 0 out of 100
  Number of Email Invocations: 0 out of 10
  Number of future calls: 0 out of 50
  Number of queueable jobs added to the queue: 0 out of 50
  Number of Mobile Apex push calls: 0 out of 10

18:35:01.729 (729435953)|LIMIT_USAGE_FOR_NS|leala|
  Number of SOQL queries: 0 out of 100
  Number of query rows: 0 out of 50000
  Number of SOSL queries: 0 out of 20
  Number of DML statements: 0 out of 150
  Number of Publish Immediate DML: 0 out of 150
  Number of DML rows: 0 out of 10000
  Maximum CPU time: 0 out of 10000
  Maximum heap size: 0 out of 6000000
  Number of callouts: 1 out of 100
  Number of Email Invocations: 0 out of 10
  Number of future calls: 0 out of 50
  Number of queueable jobs added to the queue: 0 out of 50
  Number of Mobile Apex push calls: 0 out of 10

18:35:01.729 (729435953)|CUMULATIVE_LIMIT_USAGE_END

18:35:01.42 (729506252)|CODE_UNIT_FINISHED|execute_anonymous_apex
18:35:01.42 (729523112)|EXECUTION_FINISHED
`;

export const executeAnonymousResponse = {
  compiled: true,
  success: true,
  logs: log,
  diagnostic: [],
};
export const querySuitesResult = {
  done: true,
  totalSize: 2,
  records: [{ TestSuiteName: 'Alfa' }, { TestSuiteName: 'Bravo' }],
};

export const aggregateCodeCoverageResults: {
  codeCoverageResults: CodeCoverageResult[];
  totalLines: number;
  coveredLines: number;
} = {
  codeCoverageResults: [
    {
      apexId: '01pxx00000NWwb3AAF',
      name: 'testClass',
      type: 'ApexClass',
      numLinesCovered: 1,
      numLinesUncovered: 4,
      percentage: '20%',
      coveredLines: [1],
      uncoveredLines: [2, 3, 4, 5],
    },
  ],
  totalLines: 5,
  coveredLines: 1,
};
