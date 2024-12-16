import { getFileContents, writeObjectToFile } from './fs-utils.js';
import { getCurrentProductName } from './utils.js';
import { parseHelperFiles } from './helper-files-parser.js';

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

export const generateDemoRegistry = (demos, folderPath, getDemoLink) => {
  const productName = getCurrentProductName();
  const structuredDemos = groupBy(demos, element => element.sectionName);
  Object.keys(structuredDemos).forEach((sectionName) => {
    structuredDemos[sectionName] = groupBy(
      structuredDemos[sectionName],
      element => element.demoName,
    );
  });

  const selectFromDemos = getSelector => Object.keys(structuredDemos).reduce((
    sectionsAcc,
    sectionName,
  ) => ({
    ...sectionsAcc,
    [sectionName]: Object.keys(structuredDemos[sectionName]).reduce((demosAcc, demoName) => ({
      ...demosAcc,
      [demoName]: structuredDemos[sectionName][demoName].reduce(
        getSelector(sectionName, demoName),
        {},
      ),
    }), {}),
  }), {});

  const demoDataSelector = (sectionName, demoName) => (acc, {
    themeName,
    generateDemo,
    demoExtension,
    isMigrationSample,
  }) => {
    if (isMigrationSample) {
      return acc;
    }

    const fileName = `${DEMOS_FOLDER}/${sectionName}/${themeName}/${demoName}${generateDemo ? GENERATED_SUFFIX : ''}.${demoExtension}`;
    const demoSource = getFileContents(fileName);
    const helperFiles = parseHelperFiles(demoSource);

    acc[themeName] = {
      ...getDemoLink(fileName) ? { demo: getDemoLink(fileName) } : {},
      source: demoSource,
      productName: `"${productName}"`,
      helperFiles,
      ...(demoExtension === 'tsx') ? { requireTs: 'true' } : {},
    };
    return acc;
  };

  const migrationSampleSelector = (sectionName, demoName) => (acc, {
    demoExtension,
    isMigrationSample,
  }) => {
    if (!isMigrationSample) {
      return acc;
    }

    const fileName = `${DEMOS_FOLDER}/${sectionName}/$migration/${demoName}.${demoExtension}`;
    const demoSource = getFileContents(fileName);

    return {
      source: demoSource,
    };
  };

  const sections = selectFromDemos(demoDataSelector);
  const migrationSamples = selectFromDemos(migrationSampleSelector);

  writeObjectToFile(folderPath, sections, 'demos');
  writeObjectToFile(folderPath, migrationSamples, 'migrationSamples', false);
};
