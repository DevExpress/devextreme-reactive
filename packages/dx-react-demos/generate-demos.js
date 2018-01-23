const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const THEMES_FOLDER = './src/theme-sources';
const DEMOS_FOLDER = './src/demo-sources';
const JSX_EXT = 'jsx';
const TEMPLATE_EXT_POSTFIX = 't';
const THEME_DEMO_DATA_FILE = 'demo-source-data.json';
const TEST_FILE = 'demo.test.jsxt';
const SSR_TEST_FILE = 'demo.ssr.test.jsxt';
const GENERATED_SUFFIX = '.g';

const themes = [];
fs.readdirSync(THEMES_FOLDER).forEach((themeName) => {
  if (!themeName.startsWith('.') && fs.lstatSync(path.join(THEMES_FOLDER, themeName)).isDirectory()) {
    themes.push({ name: themeName });
  }
});

const demos = [];
fs.readdirSync(DEMOS_FOLDER).forEach((sectionName) => {
  if (!sectionName.startsWith('.') && fs.lstatSync(path.join(DEMOS_FOLDER, sectionName)).isDirectory()) {
    const generateSsrTest = sectionName.indexOf('featured') > -1;

    fs.readdirSync(path.join(DEMOS_FOLDER, sectionName)).forEach((file) => {
      if (file.startsWith('.')) return;
      if (fs.lstatSync(path.join(DEMOS_FOLDER, sectionName, file)).isDirectory()) {
        fs.readdirSync(path.join(DEMOS_FOLDER, sectionName, file)).forEach((nestedFile) => {
          if (nestedFile.indexOf(GENERATED_SUFFIX) > -1) {
            fs.unlinkSync(path.join(DEMOS_FOLDER, sectionName, file, nestedFile));
            return;
          }
          const demoName = nestedFile.replace(`.${JSX_EXT}`, '');
          demos.push({
            sectionName,
            demoName,
            themes: [{ name: file }],
            generateTest: true,
            generateSsrTest,
          });
        });
      }
      if (file.endsWith(`.${JSX_EXT}${TEMPLATE_EXT_POSTFIX}`)) {
        const demoName = file.replace(`.${JSX_EXT}${TEMPLATE_EXT_POSTFIX}`, '');
        demos.push({
          sectionName,
          demoName,
          themes,
          generateDemo: true,
          generateTest: true,
          generateSsrTest,
        });
      }
    });
  }
});

const createFromTemplate = (sourceFilename, outputFilename, data) => {
  const source = fs.readFileSync(sourceFilename, 'utf-8');
  const output = mustache.render(source, data);
  fs.writeFileSync(outputFilename, output, 'utf-8');
};

demos.forEach(({
  sectionName, demoName, themes: demoThemes, generateDemo, generateTest, generateSsrTest,
}) => {
  demoThemes.forEach(({ name: themeName }) => {
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
        path.join(DEMOS_FOLDER, sectionName, `${demoName}.${JSX_EXT}${TEMPLATE_EXT_POSTFIX}`),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}${GENERATED_SUFFIX}.${JSX_EXT}`),
        demoSourceData,
      );
    }

    if (generateTest) {
      createFromTemplate(
        path.join(DEMOS_FOLDER, TEST_FILE),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}${GENERATED_SUFFIX}.test.${JSX_EXT}`),
        demoSourceData,
      );
    }

    if (generateSsrTest) {
      createFromTemplate(
        path.join(DEMOS_FOLDER, SSR_TEST_FILE),
        path.join(DEMOS_FOLDER, sectionName, themeName, `${demoName}.ssr${GENERATED_SUFFIX}.test.${JSX_EXT}`),
        demoSourceData,
      );
    }
  });
});
