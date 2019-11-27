const path = require('path');
const {
  overrideFileIfChanged, getFileContents, writeObjectToFile,
} = require('./fs-utils');
const { getCurrentProductName } = require('./utils');
const { parseHelperFiles } = require('./helper-files-parser');

const DEMOS_FOLDER = './src/demo-sources';
const GENERATED_SUFFIX = '.g';

const groupBy = (arr, iteratee) => arr
  .reduce((acc, element) => {
    const key = iteratee(element);
    if (acc[key]) {
      acc[key].push(element);
    } else {
      acc[key] = [element];
    }
    return acc;
  }, {});

const generateDemoRegistry = (demos, folderPath, getDemoLink) => {
  const productName = getCurrentProductName();
  const structuredDemos = groupBy(demos, element => element.sectionName);
  Object.keys(structuredDemos).forEach((sectionName) => {
    structuredDemos[sectionName] = groupBy(
      structuredDemos[sectionName],
      element => element.demoName,
    );
  });

  const sections = Object.keys(structuredDemos).reduce((sectionsAcc, sectionName) => {
    sectionsAcc[sectionName] = Object.keys(structuredDemos[sectionName]).reduce((demosAcc, demoName) => {
      demosAcc[demoName] = structuredDemos[sectionName][demoName]
        .reduce((themesAcc, { themeName, generateDemo, demoExtension }) => {
          const fileName = `${DEMOS_FOLDER}/${sectionName}/${themeName}/${demoName}${generateDemo ? GENERATED_SUFFIX : ''}.${demoExtension}`;
          const demoSource = getFileContents(fileName);
          const helperFiles = parseHelperFiles(demoSource);

          themesAcc[themeName] = {
            ...getDemoLink(fileName) ? { demo: getDemoLink(fileName) } : {},
            source: demoSource,
            productName: `"${productName}"`,
            helperFiles,
          };
          return themesAcc;
        }, {});

      return demosAcc;
    }, {});

    return sectionsAcc;
  }, {});

  writeObjectToFile(folderPath, sections, 'demos');
};

module.exports = {
  generateDemoRegistry,
};
