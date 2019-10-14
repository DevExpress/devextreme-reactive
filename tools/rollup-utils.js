import { readFileSync } from 'fs';
import { join } from 'path';

export const banner =
`Bundle of <%= pkg.name %>
Generated: <%= moment().format('YYYY-MM-DD') %>
Version: <%= pkg.version %>
License: https://js.devexpress.com/Licensing`;

export const external = (packageDirectory, additional) => {
  const pkg = JSON.parse(readFileSync(join(packageDirectory, 'package.json')));
  const externalDependencies = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ];

  return moduleId => {
    if (additional && additional.includes(moduleId)) return true;
    return externalDependencies
      .filter(dependency => moduleId.startsWith(dependency))
      .length > 0;
  };
};

const knownGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'react-bootstrap': 'ReactBootstrap',
  reactstrap: 'Reactstrap',
  clsx: 'classNames',
  'd3-array': 'd3Array',
  'd3-scale': 'd3Scale',
  'd3-shape': 'd3Shape',
};

export const globals = () => {
  return (moduleId) => {
      if (moduleId in knownGlobals) return knownGlobals[moduleId];

      let modulePkg;
      try {
        modulePkg = JSON.parse(readFileSync(require.resolve(join(moduleId, 'package.json'))));
      } catch(e) {
        modulePkg = {};
      }
      return modulePkg.globalName;
    }
};

export const stubProcess = 'if (typeof process === "undefined") { var process = { env: {} }; }';
