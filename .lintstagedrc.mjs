const lintStagedConfig = {
  './**/*.{js,ts,jsx,tsx,vue}': ['prettier --write', 'eslint --fix'],
};

export default lintStagedConfig;
