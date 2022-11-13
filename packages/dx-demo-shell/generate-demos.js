import fs from 'fs';
import path from 'path';

import {
  generateThemeFilesRegistry,
  generateDataHelpersRegistry,
} from './scripts/helper-files-parser.js';
import { getCurrentProductName } from './scripts/utils.js';
import {
  loadDemosToGenerate, generateDemos, removePendingFiles,
} from './scripts/demos-generator.js';
import { generateDemoRegistry } from './scripts/registry-generator.js';

const THEMES_FOLDER = './src/theme-sources';

const DEMOS_REGISTRY_FILE = './src/demo-registry.js';

const reactCommonPath = '../dx-react-common/src';
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
