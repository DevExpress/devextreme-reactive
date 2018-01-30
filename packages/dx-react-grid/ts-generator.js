const {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
} = require('fs');

const SOURCE_FOLDER = 'docs/reference/';
const TARGET_FOLDER = 'src/';
const PLUGINS_FOLDER = 'plugins/';

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
  .replace(/ReactElement/g, 'React.ReactNode')
  .replace(/ElementType/g, 'React.ComponentType');

const getFormattedLine = (line, level = 1) => {
  const elements = line.split('|')
    .map(element => tsReplace(cleanElement(element)));
  const descriptionIndex = elements.length - 1;
  const indent = ' '.repeat(level * 2);
  return `${indent}/** ${elements[descriptionIndex]} */\n${indent}${elements[0]}: ${elements[1]};\n`;
};

const getImport = (line) => {
  const regex = /\[([.\w]+)\]\((?:([-\w]+)\.md#.+\).*\|.*)/g;
  const matches = regex.exec(line);

  if (!matches) return null;

  let propertyName = matches[1];
  if (propertyName.indexOf('.') !== -1) [propertyName] = propertyName.split('.');
  return { property: propertyName, from: matches[2] };
};

const addImport = (imports, newElement) => {
  if (!newElement || imports.find(({ property }) => property === newElement.property)) {
    return imports;
  }
  return [...imports, newElement];
};

const parseFile = (source) => {
  let imports = [];

  let propertiesBlock = source.slice(source.indexOf('### Properties') + 1);
  propertiesBlock = propertiesBlock
    .slice(0, propertiesBlock.findIndex(el => el.indexOf('## ') === 0 || el.indexOf('# ') === 0))
    .filter(element => element !== 'none');
  propertiesBlock.forEach((line) => { imports = addImport(imports, getImport(line)); });

  let interfacesBlock = source.slice(source.indexOf('## Interfaces') + 1);
  interfacesBlock = interfacesBlock
    .slice(0, interfacesBlock.findIndex(el => el.indexOf('## ') === 0 || el.indexOf('# ') === 0))
    .reduce((acc, line) => {
      const nameMatches = /^###\s([\w.]+)/.exec(line);
      const name = nameMatches && nameMatches[1];
      if (name) {
        return [...acc, { name, description: '', properties: [] }];
      }
      if (acc[acc.length - 1].name === 'GroupKey' || !line.match(/.+\|.+\|.+/)) {
        if (line.indexOf('shape extended by') !== -1) {
          acc[acc.length - 1].extension = cleanElement(line.match(/\[[.\w]+\]/)[0]);
          const matches = /\[(\w+).\w+\]\((\w+).md.*\)/.exec(line);
          if (matches !== null) {
            imports = addImport(imports, { property: matches[1], from: matches[2] });
          }
        } else {
          acc[acc.length - 1].description += cleanElement(line);
        }
        return acc;
      }
      imports = addImport(imports, getImport(line));
      acc[acc.length - 1].properties.push(line);
      return acc;
    }, []);

  let componentsBlock = source.slice(source.indexOf('## Plugin Components') + 1);
  componentsBlock = componentsBlock.slice(0, componentsBlock.findIndex(el => el.indexOf('## ') === 0))
    .filter(line => line.match(/.+\|.+\|.+/));

  return {
    properties: propertiesBlock,
    interfaces: interfacesBlock,
    pluginComponents: componentsBlock,
    imports,
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
  return `${indent}/** ${description} */\n`
    + `${indent}export interface ${name}${extensionText} {\n`
    + `${properties.reduce((acc, propLine) => acc + getFormattedLine(propLine, level + 1), '')}`
    + `${indent}}\n`;
};

const generateTypeScript = (data, componentName) => {
  const imports = data.imports.reduce((acc, { property, from }) => {
    const path = from.indexOf('grid') === 0 ? '../' : './';
    return `${acc}import { ${property} } from '${path}${from}';\n`;
  }, '');
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
  const properties = data.properties.reduce((acc, line) => acc + getFormattedLine(line), '');

  return 'import * as React from \'react\';\n'
    + `${imports}`
    + '\n'
    + `${interfaces}`
    + `export interface ${componentName}Props {\n`
    + `${properties}`
    + '}\n\n'
    + `export declare const ${componentName}: React.ComponentType<${componentName}Props>;\n`;
};

const getThemesTypeScript = (data, componentName) => {
  const imports = [];
  const properties = data.properties
    .reduce((acc, line) => {
      const matches = /\[(\w+)(?:\.\w+)?\]\(.*#.+\|/.exec(line);
      if (matches !== null
          && imports.indexOf(matches[1]) === -1
          && matches[1] !== componentName) {
        imports.push(matches[1]);
      }
      let result = acc
      // return acc
        + getFormattedLine(line)
          .replace(`${componentName}.`, `${componentName}Base.`);
        // .replace(/(\w+Component):/g, '$1?:');
      if (componentName !== 'Grid') {
        result = result.replace(/(\s\s\w+):/g, '$1?:');
      }
      return result;
    }, '');

  const pluginComponents = data.pluginComponents
    .reduce((acc, line) => acc
      + getFormattedLine(line)
        .replace(/\w+\.(\w+:\s)(.+);/, '$1React.ComponentType<$2>;')
        .replace(`${componentName}.`, `${componentName}Base.`), '');

  return 'import * as React from \'react\';\n'
    + 'import {\n'
    + `  ${componentName} as ${componentName}Base,\n`
    + `${imports.reduce((acc, element) => `${acc}  ${element},\n`, '')}`
    + '} from \'@devexpress/dx-react-grid\';\n'
    + `\nexport interface ${componentName}Props {\n`
    + `${properties}`
    + '}\n\n'
    + `export declare const ${componentName}: React.ComponentType<${componentName}Props>`
    + `${pluginComponents.length ? ` & {\n${pluginComponents}}` : ''};\n`;
};

let indexContent = '';
const themesIndexContent = [];
const themes = readdirSync('../')
  .filter(folder => folder.indexOf('dx-react-grid-') !== -1)
  .map((folder) => {
    const matches = /dx-react-grid-([\w-]+)/.exec(folder);
    return matches[1];
  });

readdirSync(SOURCE_FOLDER).forEach((file) => {
  const targetFileName = file.split('.')[0];
  const targetFile = TARGET_FOLDER
    + (file.indexOf('grid') === -1 ? PLUGINS_FOLDER : '')
    + file.replace('.md', '.d.ts');

  // if (file.indexOf('grid') === -1) return;
  // if (file.indexOf('column-chooser') === -1) return;

  const componentName = getComponentName(file);

  const fileContent = String(readFileSync(SOURCE_FOLDER + file))
    .split('\n')
    .filter(line => !!line && !/^(-+|Name|Field)\s?\|/.test(line));
  const fileData = parseFile(fileContent);

  writeFileSync(targetFile, generateTypeScript(fileData, componentName));
  indexContent += `export * from '.${targetFile.replace('src', '').split('.')[0]}';\n`;

  themes.forEach((theme) => {
    const themeFile = `${(file.indexOf('grid') === -1 ? PLUGINS_FOLDER : '')}${targetFileName}`;
    const exportLine = `export * from './${themeFile}';\n`;
    if (existsSync(`../dx-react-grid-${theme}/src/${themeFile}.jsx`)) {
      writeFileSync(`../dx-react-grid-${theme}/src/${themeFile}.d.ts`, getThemesTypeScript(fileData, componentName));

      if (themesIndexContent[themesIndexContent.length - 1] !== exportLine) {
        themesIndexContent.push(exportLine);
      }
    }
  });
});

writeFileSync('src/index.d.ts', indexContent);
themes.forEach((theme) => {
  writeFileSync(`../dx-react-grid-${theme}/src/index.d.ts`, themesIndexContent.join(''));
});
