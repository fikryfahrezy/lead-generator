import baseConfig from "../../.lintstagedrc.mjs";

export default {
  ...baseConfig,
  "*.{html,css,ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
};
