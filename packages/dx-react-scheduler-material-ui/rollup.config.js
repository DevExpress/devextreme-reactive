import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import modify from 'rollup-plugin-modify';
import { banner, external, stubProcess } from '../../tools/rollup-utils';
import pkg from './package.json';

const commonPlugins = [
  resolve({
    extensions: ['.js', '.jsx'],
  }),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
  license({
    banner,
  }),
];

const commonConfig = {
  input: 'src/index.js',
  external: external(__dirname),
  plugins: commonPlugins,
};

export default [
  {
    ...commonConfig,
    output: {
      file: pkg.main, format: 'cjs', sourcemap: true, intro: stubProcess,
    },
  },
  {
    ...commonConfig,
    output: {
      file: pkg.module, format: 'es', sourcemap: true,
    },
    plugins: [
      ...commonPlugins,
      modify({
        find: /import (\w+) from '@mui\/icons-material\/(.+)';/,
        replace: (match, name, path) => `import ${name}Pkg from '@mui/icons-material/${path}.js'; const ${name} = ${name}Pkg.default;`,
      }),
    ],
  },
];
