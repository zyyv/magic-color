import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'vue/valid-v-bind': 'off',
      // 'unused-imports/no-unused-vars': [
      //   'error',
      //   {
      //     vars: 'all',
      //     varsIgnorePattern: '^_',
      //     args: 'after-used',
      //     argsIgnorePattern: '^_',
      //     caughtErrors: 'none',
      //   },
      // ],
    },
  },
  {
    files: [
      'playground/src/main.ts',
    ],
    rules: {
      'ts/ban-ts-comment': 'off',
      'ts/prefer-ts-expect-error': 'off',
    },
  },
  {
    files: [
      '*.md',
    ],
    rules: {
      'unused-imports/no-unused-vars': 'off',
    },
  },
)
