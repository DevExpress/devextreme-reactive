const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.resolve('./chart.jsxt');
const OUTPUT_FILE = path.resolve('./chart.jsx');

const overrideFileIfChanged = (filename, data) => {
  // let existingData;
  // if (fs.existsSync(filename)) {
  //   existingData = fs.readFileSync(filename, 'utf-8');
  // }
  // if (existingData !== data) {
  //   fs.writeFileSync(filename, data, 'utf-8');
  // }
  fs.writeFileSync(filename, data, 'utf-8');
};

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

const combineStringByIndex = (source, index, str) => {
  const start = source.slice(0, index);
  const end = source.slice(index);
  return start + str + end;
};

const combineStringByIndexes = (source, indexes, str) => {
  const indexesLength = indexes.length;
  const parts = [];
  let startIndex = 0;
  let endIndex = 0;

  for (let index = 0; index < indexesLength; index += 1) {
    endIndex = indexes[index];
    parts.push(source.slice(startIndex, endIndex));
    parts.push(str);
    startIndex = endIndex;
  }
  parts.push(source.slice(startIndex));

  return parts.join('');
};

const endOfLineByIndex = (source, index) => source.indexOf('\n', index);

const parseFile = () => {
  const sourceFilename = path.join(INPUT_FILE);
  const source = fs.readFileSync(sourceFilename, 'utf-8');

  const indexes = findAllIndexes(source, 'const');
  const endLineIndexes = indexes.map(index => endOfLineByIndex(source, index));

  const nextSource = combineStringByIndexes(source, endLineIndexes, ' // comment');

  // console.log(nextSource);
  // console.log(indexes);
  // console.log(nextSource);

  overrideFileIfChanged(path.join(OUTPUT_FILE), nextSource);
};

const simulateManyCalls = (value) => {
  for (let i = 0; i < value; i += 1) {
    parseFile();
  }
};

// parseFile();
simulateManyCalls(10000); // MacBook Pro 2018 15' -> ✨  Done in 1.67s.
