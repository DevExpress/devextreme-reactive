const fs = require('fs');
const path = require('path');

const THEMES_FOLDER = './src/theme-sources';
const DEMOS_FOLDER = './src/demo-sources';

const themeNames = [];
fs.readdirSync(THEMES_FOLDER).forEach((themeName) => {
  if (!themeName.startsWith('.') && fs.lstatSync(path.join(THEMES_FOLDER, themeName)).isDirectory()) {
    themeNames.push(themeName);
  }
});

const indent = (string, count) => string.split('\n').map(substring => `${' '.repeat(count)}${substring}`).join('\n');

module.exports = function DemoRegistryLoader(source) {
  this.cacheable(false);
  this.clearDependencies();

  const sectionedDemoNames = JSON.parse(source);

  const sectionsString = Object.keys(sectionedDemoNames).reduce((sectionsAcc, sectionName) => {
    const demosString = sectionedDemoNames[sectionName].reduce((demosAcc, demoName) => {
      const themesString = themeNames.reduce((themesAcc, themeName) => {
        let fileName;
        const generatedFileName = `${DEMOS_FOLDER}/${sectionName}/${themeName}/${demoName}.g.jsx`;
        if (fs.existsSync(generatedFileName)) {
          fileName = generatedFileName;
        }
        const manualFileName = `${DEMOS_FOLDER}/${sectionName}/${themeName}/${demoName}.jsx`;
        if (fs.existsSync(manualFileName)) {
          fileName = manualFileName;
        }

        if (!fileName) return themesAcc;
        const demoSource = JSON.stringify(String(fs.readFileSync(fileName, 'utf-8')));
        this.addDependency(fileName);
        return `${themesAcc}\n${indent(`'${themeName}': {\n  demo: require(${JSON.stringify(path.join(__dirname, fileName))}).default,\n  source: ${demoSource},\n},`, 2)}`;
      }, '');

      return `${demosAcc}\n${indent(`'${demoName}': {${themesString}\n},`, 2)}`;
    }, '');

    return `${sectionsAcc}\n${indent(`'${sectionName}': {${demosString}\n},`, 2)}`;
  }, '');

  return `module.exports.demos = {${sectionsString}\n};`;
};
