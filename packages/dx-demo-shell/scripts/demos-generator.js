const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const createFromTemplate = (sourceFilename, outputFilename, data) => {
  const source = fs.readFileSync(sourceFilename, 'utf-8');
  mustache.tags = ['<%', '%>'];
  const output = mustache.render(source, data);
  overrideFileIfChanged(outputFilename, output);
  cancelFileRemoving(outputFilename);
};

const loadDemosToGenerate = (themeNames) => {
  const demos = [];
  fs.readdirSync(DEMOS_FOLDER).forEach((sectionName) => {
    if (sectionName.startsWith('.')) return;
    if (fs.lstatSync(path.join(DEMOS_FOLDER, sectionName)).isDirectory()) {
      const generateSsrTest = sectionName.indexOf('featured') > -1;

      fs.readdirSync(path.join(DEMOS_FOLDER, sectionName)).forEach((file) => {
        if (file.startsWith('.')) return;
        if (fs.lstatSync(path.join(DEMOS_FOLDER, sectionName, file)).isDirectory()) {
          fs.readdirSync(path.join(DEMOS_FOLDER, sectionName, file)).forEach((nestedFile) => {
            if (nestedFile.startsWith('.')) return;
            if (nestedFile.indexOf(GENERATED_SUFFIX) > -1) {
              filesToRemove.push(path.join(DEMOS_FOLDER, sectionName, file, nestedFile));
              return;
            }
            if (nestedFile.indexOf(TEST_SUFFIX) > -1) {
              return;
            }
            const demoExtension = getDemoExtension(nestedFile);
            const demoName = nestedFile.replace(`.${demoExtension}`, '');
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
        }
        const demoExtension = getDemoExtension(file);
        if (demoExtension && file.endsWith(`.${demoExtension}${TEMPLATE_EXT_POSTFIX}`)) {
          if (file.indexOf(TEST_SUFFIX) > -1) {
            return;
          }
          const demoName = file.replace(`.${demoExtension}${TEMPLATE_EXT_POSTFIX}`, '');
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

  return demos;
};

const generateDemos = () => {
  demos.forEach(({
    sectionName,
    demoName,
    demoExtension,
    themeName,
    generateDemo,
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
      createFromTemplate(
        path.join(DEMOS_FOLDER, sectionName, `${demoName}.${demoExtension}${TEMPLATE_EXT_POSTFIX}`),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}${GENERATED_SUFFIX}.${demoExtension}`),
        demoSourceData,
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

module.exports = {
  loadDemosToGenerate,
  generateDemos,
};
