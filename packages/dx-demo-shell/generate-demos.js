const fs = require('fs');
const path = require('path');
const { generateHelperFilesRegistry } = require('./scripts/helper-files-parser');
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

const productDemosFile = productName => `../dx-react-common/src/${productName}-demo-registry.js`;

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


generateHelperFilesRegistry();

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
