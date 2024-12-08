
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import globals from "globals"


export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.node,
      }
    },
    rules: {
      indent: ['warn', 2],
      'no-continue': 'off',
      'max-len': ['error', 200],
      'no-use-before-define': 'off',
      radix: 'off',
      'no-bitwise': 'off',
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'array-callback-return': 'off',
      'no-prototype-builtins': 'off',
      any: 'off',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
)

