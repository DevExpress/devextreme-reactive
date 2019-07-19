const fs = require('fs');
const path = require('path');

const overrideFileIfChanged = (filename, data) => {
  let existingData;
  if (fs.existsSync(filename)) {
    existingData = fs.readFileSync(filename, 'utf-8');
  }
  if (existingData !== data) {
    fs.writeFileSync(filename, data, 'utf-8');
  }
};
const getFileContents = filePath => JSON.stringify(String(fs.readFileSync(filePath, 'utf-8')));
const writeObjectToFile = (filePath, obj, varName) => {
  overrideFileIfChanged(
    filePath,
    '/* eslint-disable quote-props */\n'
    + '/* eslint-disable global-require */\n'
    + '/* eslint-disable no-template-curly-in-string */\n\n'
    + `module.exports.${varName} = ${JSON.stringify(obj, null, 2)}\n;\n`,
  );
}

module.exports = {
  overrideFileIfChanged,
  getFileContents,
  writeObjectToFile,
};
