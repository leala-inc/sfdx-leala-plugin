# sfdx-leala-plugin

A plugin for Salesforce CLI build by LEALA Inc.

[![Version](https://img.shields.io/npm/v/@leala-inc/sfdx-leala-plugin.svg)](https://npmjs.org/package/@leala-inc/sfdx-leala-plugin)
[![CircleCI](https://circleci.com/gh/leala-inc/sfdx-leala-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/leala-inc/sfdx-leala-plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/leala-inc/sfdx-leala-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-leala-plugin/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/leala-inc/sfdx-leala-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/leala-inc/sfdx-leala-plugin/badge.svg)](https://snyk.io/test/github/leala-inc/sfdx-leala-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/@leala-inc/sfdx-leala-plugin.svg)](https://npmjs.org/package/@leala-inc/sfdx-leala-plugin)
[![License](https://img.shields.io/npm/l/@leala-inc/sfdx-leala-plugin.svg)](https://github.com/leala-inc/sfdx-leala-plugin/blob/master/package.json)

<!-- toc -->
* [sfdx-leala-plugin](#sfdx-leala-plugin)
<!-- tocstop -->

## Setup

### Install as plugin

1. Install plugin: `sfdx plugins:install @leala-inc/sfdx-leala-plugin`

### Install from source

1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:leala-inc/sfdx-leala-plugin.git`

3. Install npm modules: `npm install` or `yarn install`

4. Link the plugin: `sfdx plugins:link` .

<!-- install stop -->
## Commands

* `sfdx leala:apex:test:sequence`

Sequentially invoke all Apex tests or suites with code coverage.  
As of December 2021, when running `RunLocalTests` with code coverage contains a very large number of (, or large size of) apex tests, the connection may be cancelled due to a timeout and some tests may not be completed with `sfdx force:apex:test:run` command.  
This command will be sequentially invoked all apex test classes or apex test suites by the specified number each.  
Some arguments from `sfdx force:apex:test:run` are fixed.

* --codecoverage: true (and -r,--resultformat is required)
* --testlevel: RunSpecifiedTests
* --synchronous: false (classes only, currently not supported)

**Warning**: The way to get the apex test class list is **unofficial** and may stop working in the future.

<!-- commands -->
* [`sfdx leala:apex:test:sequence -e <string> -z <integer> -r human|tap|junit|json [-d <string>] [-w <string>] [-v] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-lealaapextestsequence--e-string--z-integer--r-humantapjunitjson--d-string--w-string--v--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx leala:apex:test:sequence -e <string> -z <integer> -r human|tap|junit|json [-d <string>] [-w <string>] [-v] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Sequentially invoke all Apex tests or suites with code coverage

```
USAGE
  $ sfdx leala:apex:test:sequence -e <string> -z <integer> -r human|tap|junit|json [-d <string>] [-w <string>] [-v] [-u 
  <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir=outputdir                                                         directory to store test run files

  -e, --type=classes|suites                                                         (required) [default: classes]
                                                                                    request test type; test classes or
                                                                                    test suites

  -r, --resultformat=(human|tap|junit|json)                                         (required) Permissible values are:
                                                                                    human, tap, junit, json

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --detailedcoverage                                                            display detailed code coverage per
                                                                                    test

  -w, --wait=wait                                                                   sets the streaming client socket
                                                                                    timeout in minutes; specify a longer
                                                                                    wait time if timeouts occur
                                                                                    frequently

  -z, --size=size                                                                   (required) [default: 10] number of
                                                                                    Apex test classes or Apex test
                                                                                    suites to run for each

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --verbose                                                                         display Apex test processing
                                                                                    details; if JSON is specified,
                                                                                    processing details aren't displayed

EXAMPLES
  sfdx leala:apex:test:sequence --type classes --size 20 -r human
  sfdx leala:apex:test:sequence --type suites --size 1 -r json
```

_See code: [src/commands/leala/apex/test/sequence.ts](https://github.com/leala-inc/sfdx-leala-plugin/blob/v0.0.2/src/commands/leala/apex/test/sequence.ts)_
<!-- commandsstop -->
