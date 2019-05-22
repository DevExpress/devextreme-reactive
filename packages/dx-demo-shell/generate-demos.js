const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const THEMES_FOLDER = './src/theme-sources';
const DEMOS_FOLDER = './src/demo-sources';
const TEMPLATE_EXT_POSTFIX = 't';
const THEME_DEMO_DATA_FILE = 'demo-source-data.json';
const TEST_FILE = 'demo.test.jsxt';
const TEST_FILE_TS = 'demo.test.tsxt';
const SSR_TEST_FILE = 'demo.ssr.test.jsxt';
const GENERATED_SUFFIX = '.g';
const TEST_SUFFIX = '.test';
const PARTIAL_SUFFIX = '.partial';
const DEMOS_REGISTRY_FILE = './src/demo-registry.js';
const productDemosFile = productName => `../dx-react-common/src/${productName}-demo-registry.js`;

mustache.tags = ['<%', '%>'];

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
const removeSuffix = (str, suffix) => str.substring(0, str.length - suffix.length);

const demos = [];
const loadDemosToGenerate = () => {
  fs.readdirSync(DEMOS_FOLDER).forEach((sectionName) => {
    if (sectionName.startsWith('.')) return;
    if (fs.lstatSync(path.join(DEMOS_FOLDER, sectionName)).isDirectory()) {
      const generateSsrTest = sectionName.indexOf('featured') > -1;

      fs.readdirSync(path.join(DEMOS_FOLDER, sectionName)).forEach((file) => {
        if (file.startsWith('.')) return;
        if (fs.lstatSync(path.join(DEMOS_FOLDER, sectionName, file)).isDirectory()) {
          fs.readdirSync(path.join(DEMOS_FOLDER, sectionName, file)).forEach((nestedFile) => {
            if (nestedFile.startsWith('.')) {
              return;
            }
            if (nestedFile.indexOf(GENERATED_SUFFIX) > -1) {
              filesToRemove.push(path.join(DEMOS_FOLDER, sectionName, file, nestedFile));
              return;
            }
            if (nestedFile.indexOf(TEST_SUFFIX) > -1) {
              return;
            }
            if (nestedFile.indexOf(PARTIAL_SUFFIX) > -1) {
              return;
            }
            const demoExtension = getDemoExtension(nestedFile);
            const demoName = removeSuffix(nestedFile, `.${demoExtension}`);
            const testFile = fs.existsSync(path.join(DEMOS_FOLDER, sectionName, `${demoName}${TEST_SUFFIX}.jsxt`))
              ? path.join(DEMOS_FOLDER, sectionName, `${demoName}${TEST_SUFFIX}.jsxt`)
              : getTestFileName(demoExtension);
            demos.push({
              sectionName,
              demoName,
              themeName: file,
              testFile,
              generateTest: !fs.existsSync(path.join(DEMOS_FOLDER, sectionName, file, `${demoName}${TEST_SUFFIX}.jsx`)),
              generateSsrTest,
              demoExtension,
            });
          });
          return;
        }
        const demoExtension = getDemoExtension(file);
        if (demoExtension && file.endsWith(`.${demoExtension}${TEMPLATE_EXT_POSTFIX}`)) {
          if (file.indexOf(TEST_SUFFIX) > -1) {
            return;
          }
          let demoName = removeSuffix(file, `.${demoExtension}${TEMPLATE_EXT_POSTFIX}`);
          const usePartialContent = demoName.endsWith(PARTIAL_SUFFIX);
          if (usePartialContent) {
            demoName = removeSuffix(demoName, PARTIAL_SUFFIX);
          }
          const testFile = fs.existsSync(path.join(DEMOS_FOLDER, sectionName, `${demoName}${TEST_SUFFIX}.jsxt`))
            ? path.join(DEMOS_FOLDER, sectionName, `${demoName}${TEST_SUFFIX}.jsxt`)
            : getTestFileName(demoExtension);
          themeNames.forEach((themeName) => {
            if (fs.existsSync(path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}.${demoExtension}`))) {
              return;
            }
            demos.push({
              sectionName,
              demoName,
              themeName,
              generateDemo: true,
              usePartialContent,
              testFile,
              generateTest: true,
              generateSsrTest,
              demoExtension,
            });
          });
        }
      });
    }
  });
};
const overrideFileIfChanged = (filename, data) => {
  let existingData;
  if (fs.existsSync(filename)) {
    existingData = fs.readFileSync(filename, 'utf-8');
  }
  if (existingData !== data) {
    fs.writeFileSync(filename, data, 'utf-8');
  }
};
const createFromTemplate = (sourceFilename, outputFilename, data) => {
  const source = fs.readFileSync(sourceFilename, 'utf-8');
  const output = mustache.render(source, data);
  overrideFileIfChanged(outputFilename, output);
  cancelFileRemoving(outputFilename);
};
const findSplitter = (content, index) => {
  const k = content.indexOf(' from ', index + 1);
  if (k >= 0) {
    return findSplitter(content, k);
  }
  return index >= 0 ? content.indexOf('\n', index + 1) : -1;
};
const splitPartialContent = (content) => {
  const index = findSplitter(content, -1);
  const imports = index >= 0 ? content.substring(0, index).trim() : '';
  const body = index >= 0 ? content.substring(index).trim() : content.trim();
  return { imports, body };
};
const generateDemos = () => {
  demos.forEach(({
    sectionName,
    demoName,
    demoExtension,
    themeName,
    generateDemo,
    usePartialContent,
    testFile,
    generateTest,
    generateSsrTest,
  }) => {
    const demoSourceData = {
      themeName,
      sectionName,
      demoName: `${demoName}${generateDemo ? GENERATED_SUFFIX : ''}`,
      ...JSON.parse(fs.readFileSync(path.join(THEMES_FOLDER, themeName, THEME_DEMO_DATA_FILE), 'utf-8')),
    };

    try {
      fs.mkdirSync(path.join(DEMOS_FOLDER, sectionName, themeName));
    } catch (e) {} // eslint-disable-line no-empty

    if (generateDemo) {
      let baseName = demoName;
      let data = demoSourceData;
      if (usePartialContent) {
        baseName = `${baseName}${PARTIAL_SUFFIX}`;
        const partialContent = fs.readFileSync(path.join(DEMOS_FOLDER, sectionName, themeName, `${baseName}.${demoExtension}`), 'utf-8');
        data = { ...data, ...splitPartialContent(partialContent) };
      }
      createFromTemplate(
        path.join(DEMOS_FOLDER, sectionName, `${baseName}.${demoExtension}${TEMPLATE_EXT_POSTFIX}`),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}${GENERATED_SUFFIX}.${demoExtension}`),
        data,
      );
    }

    if (generateTest) {
      createFromTemplate(
        path.join(DEMOS_FOLDER, testFile),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}${GENERATED_SUFFIX}${TEST_SUFFIX}.${demoExtension}`),
        demoSourceData,
      );
    }

    if (generateSsrTest) {
      createFromTemplate(
        path.join(DEMOS_FOLDER, SSR_TEST_FILE),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}.ssr${GENERATED_SUFFIX}${TEST_SUFFIX}.${demoExtension}`),
        demoSourceData,
      );
    }
  });
};
const groupBy = (array, iteratee) => array
  .reduce((acc, element) => {
    const key = iteratee(element);
    if (acc[key]) {
      acc[key].push(element);
    } else {
      acc[key] = [element];
    }
    return acc;
  }, {});
const indent = (string, count) => string.split('\n').map(substring => `${' '.repeat(count)}${substring}`).join('\n');
const getCurrentProductName = () => {
  const packageName = path.basename(path.resolve('./'));
  const productName = packageName.split('-')[2];
  return productName;
};
const generateDemoRegistry = (folderPath, getDemoLink) => {
  const productName = getCurrentProductName();
  const structuredDemos = groupBy(demos, element => element.sectionName);
  Object.keys(structuredDemos).forEach((sectionName) => {
    structuredDemos[sectionName] = groupBy(
      structuredDemos[sectionName],
      element => element.demoName,
    );
  });

  const sectionsString = Object.keys(structuredDemos).reduce((sectionsAcc, sectionName) => {
    const demosString = Object.keys(structuredDemos[sectionName]).reduce((demosAcc, demoName) => {
      const themesString = structuredDemos[sectionName][demoName]
        .reduce((themesAcc, { themeName, generateDemo, demoExtension }) => {
          const fileName = `${DEMOS_FOLDER}/${sectionName}/${themeName}/${demoName}${generateDemo ? GENERATED_SUFFIX : ''}.${demoExtension}`;
          const demoSource = JSON.stringify(String(fs.readFileSync(fileName, 'utf-8')));
          return `${themesAcc}\n${indent(`'${themeName}': {\n`
            + `${getDemoLink(fileName)}`
            + `  source: ${demoSource},\n`
            + `  productName: '${productName}',\n`
            + '},', 2)}`;
        }, '');
      return `${demosAcc}\n${indent(`'${demoName}': {${themesString}\n},`, 2)}`;
    }, '');

    return `${sectionsAcc}\n${indent(`'${sectionName}': {${demosString}\n},`, 2)}`;
  }, '');

  overrideFileIfChanged(
    folderPath,
    '/* eslint-disable quote-props */\n'
    + '/* eslint-disable global-require */\n'
    + '/* eslint-disable no-template-curly-in-string */\n\n'
    + `module.exports.demos = {${sectionsString}\n};\n`,
  );
};

loadThemeNames();
loadDemosToGenerate();
generateDemos();
generateDemoRegistry(
  DEMOS_REGISTRY_FILE,
  fileName => `  demo: require('.${fileName}').default,\n`,
);
generateDemoRegistry(
  productDemosFile(getCurrentProductName()),
  () => '',
);
removePendingFiles();
