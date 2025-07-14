import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  expoConfig,
  prettierRecommended,
  {
    ignores: ['dist/*'],
    rules: {
      'import/no-named-as-default': 'off',
    },
  },
]);
