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

const generateHelperFilesRegistry = () => {
  const helperRegistry = fs.readdirSync(THEME_SOURCES_FOLDER).reduce((themeAcc, themeName) => {
    const componentsPath = path.join(THEME_SOURCES_FOLDER, themeName, 'components');

    if (fs.existsSync(componentsPath)) {
      themeAcc[themeName] = fs.readdirSync(componentsPath).reduce((nameAcc, file) => {
        const source = getFileContents(path.join(componentsPath, file));
        const deps = retrieveHelperDependencies(source);
        const name = path.basename(file, path.extname(file));
        if (!nameAcc[name]) {
          nameAcc[name] = {};
        }
        nameAcc[name][file] = source;
        return nameAcc;
      }, {});
    }

    return themeAcc;
  }, {});

  writeObjectToFile(THEME_COMPONENTS_REGISTRY_FILE, helperRegistry, 'themeComponents');
};

module.exports = {

}