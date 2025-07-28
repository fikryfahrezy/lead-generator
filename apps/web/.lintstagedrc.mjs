import baseConfig from "../.lintstagedrc.js";

export default {
  ...baseConfig,
  "*.{html,css,ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
};
