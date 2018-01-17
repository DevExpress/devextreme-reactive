const fs = require('fs');

const themeNames = ['bootstrap3', 'material-ui'];

const indent = (string, count) => string.split('\n').map(substring => `${' '.repeat(count)}${substring}`).join('\n');

module.exports = function DemoRegistryLoader(source) {
  const sectionedDemoNames = JSON.parse(source);

  const sectionsString = Object.keys(sectionedDemoNames).reduce((sectionsAcc, sectionName) => {
    const demosString = sectionedDemoNames[sectionName].reduce((demosAcc, demoName) => {
      const themesString = themeNames.reduce((themesAcc, themeName) => {
        try {
          const fileName = require.resolve(`./${themeName}/${sectionName}/${demoName}.jsx`);
          const demoSource = JSON.stringify(String(fs.readFileSync(fileName, 'utf-8')));
          this.addDependency(fileName);
          return `${themesAcc}\n${indent(`'${themeName}': {\n  demo: require(${JSON.stringify(fileName)}).default,\n  source: ${demoSource},\n},`, 2)}`;
        } catch (e) {
          return themesAcc;
        }
      }, '');

      return `${demosAcc}\n${indent(`'${demoName}': {${themesString}\n},`, 2)}`;
    }, '');

    return `${sectionsAcc}\n${indent(`'${sectionName}': {${demosString}\n},`, 2)}`;
  }, '');

  return `module.exports.demos = {${sectionsString}\n};`;
};
