import { readFileSync } from 'fs';
import { join } from 'path';

export const banner =
`Bundle of <%= pkg.name %>
Generated: <%= moment().format('YYYY-MM-DD') %>
Version: <%= pkg.version %>
License: https://js.devexpress.com/Licensing`;

export const external = (packageDirectory) => {
  const pkg = JSON.parse(readFileSync(join(packageDirectory, 'package.json')));
  const externalDependencies = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ];

  return moduleId => externalDependencies
    .filter(dependency => moduleId.startsWith(dependency))
    .length > 0;
};

export const babelrc = (packageDirectory) => {
  const config = JSON.parse(readFileSync(join(packageDirectory, '.babelrc')));
  const { presets, plugins } = config;

  const index = presets.findIndex(preset => preset === 'es2015');
  presets[index] = ['es2015', { modules: false }];

  plugins.push('external-helpers');

  return config;
};

export const moduleName = (packageDirectory) => {
  const pkg = JSON.parse(readFileSync(join(packageDirectory, 'package.json')));

  return pkg.globalName;
};

const knownGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'react-bootstrap': 'ReactBootstrap',
  'material-ui': 'material-ui',
  'classnames': 'classNames',
  'material-ui/styles': 'material-ui.styles',
  'material-ui/styles/palette': 'material-ui.styles.palette',
  'material-ui-icons': 'material-ui-icons',
  'material-ui-icons/Close': 'material-ui-icons.Close',
  'material-ui-icons/List': 'material-ui-icons.List',
  'material-ui-icons/ChevronRight': 'material-ui-icons.ChevronRight',
  'material-ui-icons/ChevronLeft': 'material-ui-icons.ChevronLeft',
  'material-ui-icons/ExpandMore': 'material-ui-icons.ExpandMore',
  'material-ui-icons/ExpandLess': 'material-ui-icons.ExpandLess',
};

export const globals = (packageDirectory) => {
  return (moduleId) => {
      if (knownGlobals[moduleId]) return knownGlobals[moduleId];

      const modulePkg = JSON.parse(readFileSync(join(packageDirectory, 'node_modules', moduleId, 'package.json')));
      return modulePkg.globalName;
    }
};
