module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-import-order-alphabetical',
    'jest',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'plugin:jest/all',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'array-bracket-newline': ['error', 'always'],
    'array-element-newline': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'import-order-alphabetical/order': 'error',
    'jest/expect-expect': ['error', { 'assertFunctionNames': ['expect', 'request.**.expect'] }],
    'jest/prefer-expect-assertions': 'off',
    'jest/lowercase-name': 'off',
    'jest/no-hooks': 'off',
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
    'semi': 'off',
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }],
  },
};
