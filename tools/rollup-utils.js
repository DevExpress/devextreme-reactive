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
