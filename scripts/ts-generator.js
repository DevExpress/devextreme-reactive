const {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} = require('fs');
const { join } = require('path');

const ROOT_PATH = join(process.cwd(), 'packages');
const PACKAGE_PATH = join(ROOT_PATH, 'dx-react-grid');
const SOURCE_PATH = join(PACKAGE_PATH, 'docs/reference');
const TARGET_FOLDER = 'dist';
const PLUGINS_FOLDER = 'plugins';

const getComponentName = fileName => fileName
  .replace('.md', '')
  .split('-')
  .reduce((acc, element) =>
    acc + element.charAt(0).toUpperCase() + element.slice(1), '');

const cleanElement = element => element.trim()
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&#124;/g, '|')
  .replace(/\[([.\w\s]+)\]/g, '$1')
  .replace(/\([/#.\w\s-]+\)/g, '');

const tsReplace = element => element
  .replace(/ReactNode/g, 'React.ReactNode')
  .replace(/ComponentType/g, 'React.ComponentType')
  .replace(/ReactInstance/g, 'React.ReactInstance');

const getFormattedLine = (line, level = 1) => {
  const elements = line.split('|')
    .map(element => tsReplace(cleanElement(element)));
  const descriptionIndex = elements.length - 1;
  const indent = ' '.repeat(level * 2);
  return `${indent}/** ${elements[descriptionIndex]} */\n${indent}${elements[0]}: ${elements[1]};\n`;
};

const parseFile = (source) => {
  let description = cleanElement(source
    .slice(1, source.findIndex(el => el.indexOf('## ') === 0))
    .join(''));

  let propertiesBlock = source.slice(source.indexOf('### Properties') + 1);
  propertiesBlock = propertiesBlock
    .slice(0, propertiesBlock.findIndex(el => el.indexOf('## ') === 0 || el.indexOf('# ') === 0))
    .filter(element => element !== 'none');

  let interfacesBlock = source.slice(source.indexOf('## Interfaces') + 1);
  interfacesBlock = interfacesBlock
    .slice(0, interfacesBlock.findIndex(el => el.indexOf('## ') === 0 || el.indexOf('# ') === 0))
    .reduce((acc, line) => {
      const nameMatches = /^###\s([\w.]+)/.exec(line);
      const name = nameMatches && nameMatches[1];
      const lastItemIndex = acc.length - 1;
      if (name) {
        return [...acc, { name, description: '', properties: [] }];
      }
      if (acc[lastItemIndex].name === 'GroupKey' || !line.match(/.+\|.+\|.+/)) {
        if (line.indexOf('Extends ') === 0) {
          acc[lastItemIndex].extension = cleanElement(line.match(/\[[.\w]+\]/)[0]);
        } else {
          acc[lastItemIndex].description += cleanElement(line);
        }
        return acc;
      }
      acc[lastItemIndex].properties.push(line);
      return acc;
    }, []);

  let componentsBlock = source.slice(source.indexOf('## Plugin Components') + 1);
  componentsBlock = componentsBlock.slice(0, componentsBlock.findIndex(el => el.indexOf('## ') === 0))
    .filter(line => line.match(/.+\|.+\|.+/));

  let messagesBlock = source.slice(source.indexOf('## Localization Messages') + 1);
  messagesBlock = messagesBlock
    .slice(0, messagesBlock.findIndex(el => el.indexOf('## ') === 0))
    .filter(line => line.match(/.+\|.+\|.+/));

  return {
    description,
    properties: propertiesBlock,
    interfaces: interfacesBlock,
    pluginComponents: componentsBlock,
    localizationMessages: messagesBlock,
  };
};

const getInterfaceExport = ({
  name,
  description,
  properties,
  extension,
}, level = 0) => {
  const indent = ' '.repeat(2 * level);
  const extensionText = extension ? ` extends ${extension}` : '';
  const propertiesText = properties
    .reduce((acc, propLine) => acc + getFormattedLine(propLine, level + 1), '')
    .replace(': { [key: number | string]: any };', ': { [key: string]: any };');
  return `${indent}/** ${description} */\n`
    + `${indent}export interface ${name}${extensionText} {\n`
    + `${propertiesText}`
    + `${indent}}\n`;
};

const generateTypeScript = (data, componentName) => {
  const interfaces = data.interfaces.reduce((acc, currentInterface) => {
    const { name } = currentInterface;
    if (name === 'GroupKey') return `${acc}export type ${name} = string;\n\n`;
    if (name.indexOf('.') !== -1) {
      const [namespace, interfaceName] = name.split('.');
      return `${acc}export namespace ${namespace} {\n`
        + `${getInterfaceExport({ ...currentInterface, name: interfaceName }, 1)}`
        + '}\n\n';
    }
    return `${acc}${getInterfaceExport(currentInterface)}\n`;
  }, '');
  const localizationMessages = data.localizationMessages
    .reduce((acc, line) => acc + getFormattedLine(line, 2), '');
  const properties = data.properties
    .reduce((acc, line) => acc + getFormattedLine(line), '');

  let result = interfaces;

  if (localizationMessages.length) {
    result += `export namespace ${componentName} {\n`
    + '  export interface LocalizationMessages {\n'
    + `${localizationMessages}`
    + '  }\n'
    + '}\n\n';
  }

  result += `export interface ${componentName}Props {\n`
    + `${properties}`
    + '}\n\n'
    + `/** ${data.description} */\n`
    + `export declare const ${componentName}: React.ComponentType<${componentName}Props>;\n`;

  return result;
};

const getThemesTypeScript = (data, componentName) => {
  const properties = data.properties
    .reduce((acc, line) => {
      let result = acc
        + getFormattedLine(line)
          .replace(`${componentName}.`, `${componentName}Base.`)
          .replace('Table.', 'TableBase.');
      if (componentName !== 'Grid') {
        result = result.replace(/(\s\s\w+):/g, '$1?:');
      } else {
        result = result.replace(/(\s\s\w+Component):/g, '$1?:');
      }
      return result;
    }, '');

  const pluginComponents = data.pluginComponents
    .reduce((acc, line) => acc
      + getFormattedLine(line)
        .replace(/\w+\.(\w+:\s)(.+);/, '$1React.ComponentType<$2>;')
        .replace(`${componentName}.`, `${componentName}Base.`)
        .replace('Table.', 'TableBase.'), '');

  return 'import {\n'
    + `  ${componentName} as ${componentName}Base,\n`
    + '} from \'@devexpress/dx-react-grid\';\n'
    + `\nexport interface ${componentName}Props {\n`
    + `${properties}`
    + '}\n\n'
    + `/** ${data.description} */\n`
    + `export declare const ${componentName}: React.ComponentType<${componentName}Props>`
    + `${pluginComponents.length ? ` & {\n${pluginComponents}}` : ''};\n`;
};

let indexContent = 'import * as React from \'react\';\n';
let themesIndexContent = '';
const themesImports = [];
const themes = readdirSync(ROOT_PATH)
  .filter(folder => folder.indexOf('dx-react-grid-') !== -1)
  .map((folder) => {
    const matches = /dx-react-grid-([\w-]+)/.exec(folder);
    return matches[1];
  });

readdirSync(SOURCE_PATH).forEach((file) => {
  const targetFileName = file.split('.')[0];
  const componentName = getComponentName(file);
  const fileContent = String(readFileSync(join(SOURCE_PATH, file)))
    .split('\n')
    .filter(line => !!line && !/^(-+|Name|Field)\s?\|/.test(line));
  const fileData = parseFile(fileContent);

  indexContent += `\n// ${'-'.repeat(97)}\n// ${componentName}\n// ${'-'.repeat(97)}\n\n`;
  indexContent += generateTypeScript(fileData, componentName);

  const themeFile = join((file.indexOf('grid') === -1 ? PLUGINS_FOLDER : ''), targetFileName);
  const targetThemeFolder = join(ROOT_PATH, `dx-react-grid-${themes[0]}`, 'src');
  if (existsSync(join(targetThemeFolder, `${themeFile}.jsx`))) {
    fileData.properties
      .reduce((acc, line) => {
        const matches = /\[(\w+)(?:\.\w+)?\]\(.*#.*\)/.exec(line);
        if (matches !== null && matches[1] !== componentName
          && matches[1] !== 'Table' && acc.indexOf(matches[1]) === -1) {
          acc.push(matches[1]);
        }
        return acc;
      }, [])
      .forEach((element) => {
        if (themesImports.indexOf(element) === -1) {
          themesImports.push(element);
        }
      });

    themesIndexContent += `\n// ${'-'.repeat(97)}\n// ${componentName}\n// ${'-'.repeat(97)}\n\n`;
    themesIndexContent += getThemesTypeScript(fileData, componentName);
  }
});

themesIndexContent = 'import * as React from \'react\';\n'
  + 'import {\n'
  + `  ${themesImports.join(',\n  ')}`
  + '\n} from \'@devexpress/dx-react-grid\';\n'
  + `${themesIndexContent}`;

const ensureDirectory = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
};

console.log('Building TypeScript definitions for \'dx-react-grid\'.');
const distFolder = join(PACKAGE_PATH, TARGET_FOLDER);
ensureDirectory(distFolder);
writeFileSync(join(distFolder, 'dx-react-grid.d.ts'), indexContent);

themes.forEach((theme) => {
  console.log(`Building TypeScript definitions for 'dx-react-grid-${theme}'.`);
  const themeDistFolder = join(ROOT_PATH, `dx-react-grid-${theme}`, TARGET_FOLDER);
  ensureDirectory(themeDistFolder);
  writeFileSync(
    join(themeDistFolder, `dx-react-grid-${theme}.d.ts`),
    themesIndexContent,
  );
});
