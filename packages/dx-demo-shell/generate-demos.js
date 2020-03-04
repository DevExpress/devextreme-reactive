const fs = require('fs');
const path = require('path');
const {
  generateThemeFilesRegistry,
  generateDataHelpersRegistry,
} = require('./scripts/helper-files-parser');
// const mustache = require('mustache');
// const {
//   overrideFileIfChanged, getFileContents, writeObjectToFile,
// } = require('./scripts/fs-utils');
const { getCurrentProductName } = require('./scripts/utils');
const {
  loadDemosToGenerate, generateDemos, removePendingFiles,
} = require('./scripts/demos-generator');
const { generateDemoRegistry } = require('./scripts/registry-generator');

const THEMES_FOLDER = './src/theme-sources';


const DEMOS_REGISTRY_FILE = './src/demo-registry.js';

const reactCommonPath = `../dx-react-common/src`;
const productDemosFile = productName => `${reactCommonPath}/${productName}-demo-registry.js`;
const productDemoDataFile = productName => `${reactCommonPath}/${productName}-demo-data-registry.js`;
const productThemeComponentsFile = productName => (
  `${reactCommonPath}/${productName}-theme-components-registry.js`
);

const loadThemeNames = () => {
  const themeNames = [];
  fs.readdirSync(THEMES_FOLDER).forEach((themeName) => {
    if (themeName.startsWith('.')) return;
    if (fs.lstatSync(path.join(THEMES_FOLDER, themeName)).isDirectory()) {
      themeNames.push(themeName);
    }
  });
  return themeNames;
};

// {
//   "file": ["path/dep1", "path/dep2"]
// }
// {
//   "path/file": "file contents",
// }

generateThemeFilesRegistry(productThemeComponentsFile(getCurrentProductName()));
generateDataHelpersRegistry(productDemoDataFile(getCurrentProductName()));

const themeNames = loadThemeNames();
const demos = loadDemosToGenerate(themeNames);
generateDemos(demos);
generateDemoRegistry(
  demos,
  DEMOS_REGISTRY_FILE,
  fileName => `require('.${fileName}').default`,
);
generateDemoRegistry(
  demos,
  productDemosFile(getCurrentProductName()),
  () => '',
);
removePendingFiles();
