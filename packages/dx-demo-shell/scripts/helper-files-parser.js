const fs = require('fs');
const path = require('path');
const {
  getFileContents, writeObjectToFile,
} = require('./fs-utils');
const { getCurrentProductName } = require('./utils');

const THEME_SOURCES_FOLDER = './src/theme-sources';
const DEMO_DATA_FOLDER = './src/demo-data';
const THEME_COMPONENTS_REGISTRY_FILE = './src/theme-components-registry.js';
const DEMO_DATA_REGISTRY_FILE = './src/demo-data-registry.js';

const quotify = arr => arr.map(i => `"${i.replace(/[\'\"]+/g, '')}"`);
const retrieveImportFiles = (imports, regex) => imports
  .map(s => s.match(regex))
  .filter(r => !!r)
  .map(r => r[1]);

const knownDeepImports = ['@mui/material', '@mui/icons-material'];
const dependencies = {
  '"@mui/material"': ['"@mui/icons-material"'],
  '"@devexpress/dx-react-chart-material-ui"': [
    '"@devexpress/dx-react-chart"',
    '"@mui/icons-material"',
    '"@emotion/react"',
    '"@emotion/styled"',
  ],
  '"@devexpress/dx-react-chart-bootstrap4"': ['"@devexpress/dx-react-chart"'],
  '"@devexpress/dx-react-chart"': ['"@devexpress/dx-react-core"'],
  '"@devexpress/dx-react-grid-bootstrap3"': [
    '"@devexpress/dx-react-grid"',
    'react-bootstrap',
  ],
  '"@devexpress/dx-react-grid-bootstrap4"': ['"@devexpress/dx-react-grid"'],
  '"@devexpress/dx-react-grid-material-ui"': [
    '"@devexpress/dx-react-grid"',
    '"@mui/icons-material"',
    '"@emotion/react"',
    '"@emotion/styled"',
    '"@mui/lab"',
  ],
  '"@devexpress/dx-react-grid"': ['"@devexpress/dx-react-core"'],
  '"@devexpress/dx-react-scheduler-material-ui"': [
    '"@devexpress/dx-react-scheduler"',
    '"@mui/icons-material"',
    '"@emotion/react"',
    '"@emotion/styled"',
    '"@mui/lab"',
  ],
  '"@devexpress/dx-react-scheduler"': ['"@devexpress/dx-react-core"'],
};

const getDepsRecursive = (name, deps = []) => {
  if (dependencies[name]) {
    return dependencies[name].reduce((acc, dep) => (
      [...acc, ...getDepsRecursive(dep, [...deps, dep, ...(dependencies[dep] || [])])]
    ), []);
  }
  if (name) {
    return [...deps, name];
  }
  return deps;
};

const parseHelperFiles = (source) => {
  const imports = source.split('import');
  const themeComponents = quotify(retrieveImportFiles(
    imports, /'.+(theme-sources[^']+?[\w]+\/?[\w-]+)'/,
  ));
  const demoData = quotify(retrieveImportFiles(
    imports, /'.+(demo-data\/[\w\.-]+?)'/,
  ));
  let externalDeps = quotify(retrieveImportFiles(imports, /from '([^\.].+?)'/));
  externalDeps = quotify(externalDeps
    .map(d => (knownDeepImports.filter(di => d.includes(di)) || [''])[0] || d) // get package by path import
    .reduce((acc, d) => ([...acc, d, ...(getDepsRecursive(d) || [])]), []) // get direct deps
    .reduce((acc, d) => (acc.includes(d) ? acc : [...acc, d]), [])); // unique

  return {
    themeComponents,
    demoData,
    externalDeps,
  };
};

const retrieveHelperDependencies = (source) => {
  const imports = source.split('import');

  return retrieveImportFiles(imports, /'\.\/(.+?)'/);
};

const listFilesRecursively = dir => (
  listFilesRecursivelyCore(dir)
    .map(f => f.replace(path.normalize(dir + '/'), '')) // leave only relative part
);
// returns flat file structure
const listFilesRecursivelyCore = (dir) => (
  fs.readdirSync(dir)
    .reduce((files, item) => (
      fs.statSync(path.join(dir, item)).isDirectory()
        ? [...files, ...listFilesRecursivelyCore(path.join(dir, item))]
        : [...files, path.join(dir, item)]),
    [])
);
const getFileName = f => path.basename(f, path.extname(f));
const isSameFile = (path1, path2) => getFileName(path1) === getFileName(path2);

const generateDirRegistry = (dir) => {
  const fileList = listFilesRecursively(dir);

  return fileList.reduce((acc, file) => {
    const source = getFileContents(path.join(dir, file));
    const [root, ...dirs] = dir.split(path.sep);
    const dirname = dirs.join('/') + '/';
    // deps should include extension
    const deps = retrieveHelperDependencies(source)
      .map(d => fileList.find(f => isSameFile(f, d)))
      .map(d => dirname + d);
    const fileName = dirname + file.split(path.sep).join('/');

    acc['files'][fileName] = source;
    if (deps.length) {
      acc['deps'][fileName] = quotify(deps);
    }
    return acc;
  }, { deps: {}, files: {} });
};

const generateThemeFilesRegistry = (commonPath) => {
  const helperRegistry = fs.readdirSync(THEME_SOURCES_FOLDER).reduce((themeAcc, themeName) => {
    const componentsPath = path.join(THEME_SOURCES_FOLDER, themeName, 'components');

    if (fs.existsSync(componentsPath)) {
      themeAcc[themeName] = generateDirRegistry(componentsPath);
    }

    return themeAcc;
  }, {});

  writeObjectToFile(
    THEME_COMPONENTS_REGISTRY_FILE,
    { [getCurrentProductName()]: helperRegistry },
    'themeComponents',
  );

  writeObjectToFile(
    commonPath,
    { [getCurrentProductName()]: helperRegistry },
    'themeComponents',
  );

};

const parseDepsVersions = () => {
  const deps = require(process.cwd() + '/package.json').dependencies;
  return JSON.stringify(deps);
};

const generateDataHelpersRegistry = (commonPath) => {
  const registry = generateDirRegistry(path.normalize(DEMO_DATA_FOLDER));
  const depsVersions = parseDepsVersions();
  writeObjectToFile(
    DEMO_DATA_REGISTRY_FILE,
    { [getCurrentProductName()]: { ...registry, depsVersions } },
    'demoData',
  );
  writeObjectToFile(
    commonPath,
    { [getCurrentProductName()]: { ...registry, depsVersions } },
    'demoData',
  );
};

module.exports = {
  generateThemeFilesRegistry,
  generateDataHelpersRegistry,
  // generateHelperFilesRegistry: () => {
  // },
  parseHelperFiles,
};
