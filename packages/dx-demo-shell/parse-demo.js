// ======== for remove
// const fs = require('fs');
// const path = require('path');

// const INPUT_FILE = path.resolve('./chart.jsxt');
// const OUTPUT_FILE = path.resolve('./chart.jsx');

// const overrideFileIfChanged = (filename, data) => {
//   // let existingData;
//   // if (fs.existsSync(filename)) {
//   //   existingData = fs.readFileSync(filename, 'utf-8');
//   // }
//   // if (existingData !== data) {
//   //   fs.writeFileSync(filename, data, 'utf-8');
//   // }
//   fs.writeFileSync(filename, data, 'utf-8');
// };

// const parseFile2 = (meta) => { // for testing
//   const sourceFilename = path.join(INPUT_FILE);
//   const source = fs.readFileSync(sourceFilename, 'utf-8');

//   const outputSource = meta.reduce((acc, { findStr, addStr }) => {
//     const addedStr = `${addStr}\n`;
//     const indexes = findAllIndexes(acc, findStr);

//     const nextSource = combineStringByIndexes(acc, indexes, addedStr);
//     return nextSource;
//   }, source);

//   overrideFileIfChanged(path.join(OUTPUT_FILE), outputSource);
// };

// ==========

const findAllIndexes = (source, str) => {
  let position = 0;
  const indexes = [];
  const targetLength = str.length;

  while (source.indexOf(str, position) !== -1) {
    const lastPosition = source.indexOf(str, position);
    indexes.push(lastPosition);
    position = lastPosition + targetLength;
  } return indexes;
};

const findWhiteSpacesCount = (source, index) => {
  let str = '';
  while (source[index - str.length - 1] === ' ') {
    str += ' ';
  } return str;
};

const combineStringByIndexes = (source, indexes, str) => {
  const indexesLength = indexes.length;
  const parts = [];
  let startIndex = 0;
  let endIndex = 0;

  for (let index = 0; index < indexesLength; index += 1) {
    endIndex = indexes[index];
    parts.push(source.slice(startIndex, endIndex)); // add part before comment
    parts.push(str); // add comment
    parts.push(findWhiteSpacesCount(source, indexes[index])); // add white spaces before next part
    startIndex = endIndex;
  }
  parts.push(source.slice(startIndex));

  return parts.join('');
};

module.exports = (source, meta) => meta
  .reduce((acc, { findStr, addStr }) => {
    const addedStr = `${addStr}\n`;
    const indexes = findAllIndexes(acc, findStr);

    return combineStringByIndexes(acc, indexes, addedStr);
  }, source);
