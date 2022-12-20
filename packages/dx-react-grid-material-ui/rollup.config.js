import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import modify from 'rollup-plugin-modify';
import { banner, external, stubProcess } from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main, format: 'cjs', sourcemap: true, intro: stubProcess,
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    modify({
      find: /import (\w+) from '@mui\/icons-material\/(.+)';/,
      replace: (match, name, path) => `import ${name}Pkg from '@mui/icons-material/${path}.js'; const ${name} = ${name}Pkg.default;`,
    }),
    license({
      banner,
    }),
  ],
};
