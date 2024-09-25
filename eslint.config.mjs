import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: { ...globals.browser, process: 'readonly', __dirname: 'readonly' } } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
    }
  }
];
