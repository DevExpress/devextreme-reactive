const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const {
  overrideFileIfChanged, getFileContents, writeObjectToFile,
} = require('./scripts/fs-utils');
const { loadDemosToGenerate, generateDemos } = require('./scripts/demos-generator');

const THEMES_FOLDER = './src/theme-sources';
const DEMOS_FOLDER = './src/demo-sources';
const THEME_SOURCES_FOLDER = './src/theme-sources';
const DEMO_DATA_FOLDER = './src/demo-data';

const TEMPLATE_EXT_POSTFIX = 't';
const THEME_DEMO_DATA_FILE = 'demo-source-data.json';
const TEST_FILE = 'demo.test.jsxt';
const TEST_FILE_TS = 'demo.test.tsxt';
const SSR_TEST_FILE = 'demo.ssr.test.jsxt';
const GENERATED_SUFFIX = '.g';
const TEST_SUFFIX = '.test';

const DEMOS_REGISTRY_FILE = './src/demo-registry.js';
const THEME_COMPONENTS_REGISTRY_FILE = './src/theme-components-registry.js'
const productDemosFile = productName => `../dx-react-common/src/${productName}-demo-registry.js`;

const themeNames = [];
const loadThemeNames = () => {
  fs.readdirSync(THEMES_FOLDER).forEach((themeName) => {
    if (themeName.startsWith('.')) return;
    if (fs.lstatSync(path.join(THEMES_FOLDER, themeName)).isDirectory()) {
      themeNames.push(themeName);
    }
  });
};

const filesToRemove = [];
const cancelFileRemoving = (filename) => {
  const removeIndex = filesToRemove.indexOf(filename);
  if (removeIndex > -1) {
    filesToRemove.splice(removeIndex, 1);
  }
};
const removePendingFiles = () => {
  filesToRemove.forEach(file => fs.unlinkSync(file));
};
const getDemoExtension = (source) => {
  const nameReplaceRegex = new RegExp('\\.(jsx?|tsx?)');
  const extensionMatches = nameReplaceRegex.exec(source);
  if (extensionMatches === null) return null;
  return extensionMatches[1];
};
const getTestFileName = demoExtension => (
  demoExtension.startsWith('tsx')
    ? TEST_FILE_TS
    : TEST_FILE
);

const retrieveHelperDependencies = (source) => {
  const imports = source.split('import');

  const themeComponents = retrieveImportFiles(imports, /'\.\/(.+)'/);
  if (themeComponents.length) {
    console.log(themeComponents)
  }
}
const generateDemoDataRegistry = () => {
  const registry = fs.readdirSync(DEMO_DATA_FOLDER).forEach(file => {

  });
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
generateDemos();
generateDemoRegistry(
  demos,
  DEMOS_REGISTRY_FILE,
  fileName => `require('.${fileName}').default`,
);
generateDemoRegistry(
  productDemosFile(getCurrentProductName()),
  () => '',
);
removePendingFiles();
