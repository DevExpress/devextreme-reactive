import fs from 'fs';

export const overrideFileIfChanged = (filename, data) => {
  let existingData;
  if (fs.existsSync(filename)) {
    existingData = fs.readFileSync(filename, 'utf-8');
  }
  if (existingData !== data) {
    fs.writeFileSync(filename, data, 'utf-8');
  }
};
const indent = level => ' '.repeat(level * 2);
export const getFileContents = filePath => JSON.stringify(String(fs.readFileSync(filePath, 'utf-8')));

const stringifyEntity = (entity, level) => {
  const type = typeof entity;

  if (Array.isArray(entity)) {
    if (entity.length === 0) {
      return '[],\n';
    }
    return '[\n'
      + entity.reduce((acc, i) => (
        `${acc}${indent(level + 1)}${stringifyEntity(i)}`
      ), '')
      + `${indent(level)}],\n`;
  }

  if (type === "object" && entity !== null) {
    return '{\n'
      + stringifyObject(entity, level + 1)
      + (level === 0 ? '}' : indent(level) + '},\n');
  }

  if (type === "string" || type === "number") {
    return entity + ',\n';
  }
  throw new Error('unsupported entity');
}
const stringifyObject = (obj, level) => Object.keys(obj)
  .reduce((acc, prop) => (
    `${acc}${indent(level)}"${prop}": ${stringifyEntity(obj[prop], level)}`
  ), '');

const stringify = obj => stringifyEntity(obj, 0);

export const writeObjectToFile = (filePath, obj, varName) => {
  overrideFileIfChanged(
    filePath,
    `export const ${varName} = ${stringify(obj)};\n`,
  );
};
