/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

module.exports = {
  extends: ['eslint-config-salesforce-typescript'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts', '*.nut.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
