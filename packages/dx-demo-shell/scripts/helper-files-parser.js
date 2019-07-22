const fs = require('fs');
const path = require('path');
const {
  overrideFileIfChanged, getFileContents, writeObjectToFile,
} = require('./fs-utils');

const THEME_SOURCES_FOLDER = './src/theme-sources';
const DEMO_DATA_FOLDER = './src/demo-data/';
const THEME_COMPONENTS_REGISTRY_FILE = './src/theme-components-registry.js'
const DEMO_DATA_REGISTRY_FILE = './src/demo-data-registry.js'

const quotify = arr => arr.map(i => `"${i}"`);
const retrieveImportFiles = (imports, regex) => imports
    .map(s => s.match(regex))
    .filter(r => !!r)
    .map(r => r[1]);

const parseHelperFiles = (source) => {
  const imports = source.split('import');
  const themeComponents = quotify(retrieveImportFiles(imports, /'.+theme-sources[^']+?([\w-]+)'/));
  const demoData = quotify(retrieveImportFiles(imports, /'.+demo-data\/.*?([\w\.-]+?)'/));

  return {
    themeComponents,
    demoData,
  };
};

const retrieveHelperDependencies = (source) => {
  const imports = source.split('import');

  const themeComponents = retrieveImportFiles(imports, /'\.\/(.+?)'/);
  if (themeComponents.length) {
    console.log(themeComponents)
  }
  return themeComponents;
};

const listFilesRecursively = dir => (
  listFilesRecursivelyCore(dir)
    .map(f => f.replace(path.normalize(dir + '/'), ''))
);
// returns flat file structure
const listFilesRecursivelyCore = (dir) => (
  fs.readdirSync(dir)
    .reduce((files, item) =>
      fs.statSync(path.join(dir, item)).isDirectory()
        ? [...files, ...listFilesRecursivelyCore(path.join(dir, item))]
        : [...files, path.join(dir, item)],
      [])
);
const getFileName = f => path.basename(f, path.extname(f));
const isSameFile = (path1, path2) => getFileName(path1) === getFileName(path2);

const generateDirRegistry = (dir) => {
  const fileList = listFilesRecursively(dir);
  console.log(fileList)

  return fileList.reduce((acc, file) => {
    const source = getFileContents(path.join(dir, file));
    // deps should include extension
    const deps = retrieveHelperDependencies(source).map(d => fileList.find(f => isSameFile(f, d)));
    console.log(deps)
    const fileName = path.basename(file);
    // if(deps.length && !deps[0]) { debugger; retrieveHelperDependencies(source).map(d => fileList.find(f => isSameFile(f, d))); }
    acc['files'][fileName] = source;
    if (deps.length) {
      acc['deps'][fileName] = quotify(deps);
    }
    return acc;
  }, { deps: {}, files: {} });
}

const generateThemeFilesRegistry = (dir) => {
  const helperRegistry = fs.readdirSync(THEME_SOURCES_FOLDER).reduce((themeAcc, themeName) => {
    const componentsPath = path.join(THEME_SOURCES_FOLDER, themeName, 'components');

    if (fs.existsSync(componentsPath)) {
      themeAcc[themeName] = generateDirRegistry(componentsPath);
    }

    return themeAcc;
  }, {});

  writeObjectToFile(THEME_COMPONENTS_REGISTRY_FILE, helperRegistry, 'themeComponents');
};

const generateDataHelpersRegistry = () => {
  const registry = generateDirRegistry(DEMO_DATA_FOLDER);
  writeObjectToFile(DEMO_DATA_REGISTRY_FILE, registry, 'demoData');
};

module.exports = {
  generateHelperFilesRegistry: () => {
    generateThemeFilesRegistry();
    generateDataHelpersRegistry();
  },
  parseHelperFiles,
};