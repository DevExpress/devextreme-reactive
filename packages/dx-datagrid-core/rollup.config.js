import * as fs from 'fs';
import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';

const banner =
`Bundle of <%= pkg.name %>
Generated: <%= moment().format('YYYY-MM-DD') %>
Version: <%= pkg.version %>
License: https://js.devexpress.com/Licensing`;

const external = (() => {
  const pkg = JSON.parse(fs.readFileSync('./package.json'));
  const dependencies = Object.keys(pkg.dependencies || {});

  return moduleId => dependencies
      .filter(dependency => moduleId.startsWith(dependency))
      .length > 0;
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
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    license({
      sourceMap: true,
      banner,
    }),
  ],
};
