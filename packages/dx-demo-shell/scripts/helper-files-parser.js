const fs = require('fs');
const path = require('path');
const {
  overrideFileIfChanged, getFileContents, writeObjectToFile,
} = require('./fs-utils');

const THEME_SOURCES_FOLDER = './src/theme-sources';
const DEMO_DATA_FOLDER = './src/demo-data/';
const THEME_COMPONENTS_REGISTRY_FILE = './src/theme-components-registry.js'
const DEMO_DATA_REGISTRY_FILE = './src/demo-data-registry.js'

const retrieveImportFiles = (imports, regex) => imports
    .map(s => s.match(regex))
    .filter(r => !!r)
    .map(r => r[1]);

const parseHelperFiles = (source) => {
  const imports = source.split('import');
  const themeComponents = retrieveImportFiles(imports, /'.+theme-sources[^']+?([\w-]+)'/);
  const demoData = retrieveImportFiles(imports, /'.+demo-data\/(.+?)'/);

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
const listFilesRecursivelyCore = (dir) => (
  fs.readdirSync(dir)
    .reduce((files, item) =>
      fs.statSync(path.join(dir, item)).isDirectory()
        ? [...files, ...listFilesRecursivelyCore(path.join(dir, item))]
        : [...files, path.join(dir, item)],
      [])
);
    
const generateDirRegistry = (dir) => {
  const fileList = listFilesRecursively(dir);

  return fileList.reduce((acc, file) => {
    const source = getFileContents(path.join(dir, file));
    const deps = retrieveHelperDependencies(source).map(d => fileList.find(f => {
      console.log(path.basename(f, path.extname(f)), d)
      return path.basename(f, path.extname(f)) === path.basename(d, path.extname(d))
    }));
    // console.log(deps)
    // const name = path.basename(file, path.extname(file));
    
    acc['files'][file] = source;
    if (deps.length) {
      acc['deps'][file] = deps;
    }
    return acc;
  }, { deps: {}, files: {} });
}

const generateThemeFilesRegistry = (dir) => {
  // const files = listFilesRecursively(dir);
  const helperRegistry = fs.readdirSync(THEME_SOURCES_FOLDER).reduce((themeAcc, themeName) => {
    const componentsPath = path.join(THEME_SOURCES_FOLDER, themeName, 'components');

    if (fs.existsSync(componentsPath)) {
      themeAcc[themeName] = generateDirRegistry(componentsPath);
      // themeAcc[themeName] = fs.readdirSync(componentsPath).reduce((nameAcc, file) => {
      //   const source = getFileContents(path.join(componentsPath, file));
      //   const deps = retrieveHelperDependencies(source);
      //   // const name = path.basename(file, path.extname(file));
        
      //   nameAcc['files'][file] = source;
      //   if (deps.length) {
      //     nameAcc['deps'][file] = deps;
      //   }
      //   return nameAcc;
      // }, { deps: {}, files: {} });
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