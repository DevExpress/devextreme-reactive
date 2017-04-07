import { readFileSync } from 'fs';
import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';

const banner =
`Bundle of <%= pkg.name %>
Generated: <%= moment().format('YYYY-MM-DD') %>
Version: <%= pkg.version %>
License: https://js.devexpress.com/Licensing`;

const external = (() => {
  const pkg = JSON.parse(readFileSync('./package.json'));
  const dependencies = Object.keys(pkg.dependencies || {});

  return moduleId => dependencies
      .filter(dependency => moduleId.startsWith(dependency))
      .length > 0;
})();

const babelrc = (() => {
  const config = JSON.parse(readFileSync('./.babelrc'));
  const { presets } = config;
  const index = presets.findIndex(preset => preset === 'es2015');
  presets[index] = ['es2015', { modules: false }];
  return config;
})();

export default {
  entry: 'src/index.js',
  sourceMap: true,
  targets: [
    {
      format: 'cjs',
      dest: 'dist/dx-datagrid-core.cjs.js',
    },
    {
      format: 'es',
      dest: 'dist/dx-datagrid-core.es.js',
    },
  ],
  external,
  plugins: [
    babel(Object.assign({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }, babelrc)),
    license({
      sourceMap: true,
      banner,
    }),
  ],
};
