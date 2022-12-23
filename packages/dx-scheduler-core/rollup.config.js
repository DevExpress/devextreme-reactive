import license from 'rollup-plugin-license';
import { default as typescriptRollup } from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import typescript from 'typescript';
import modify from 'rollup-plugin-modify';
import {
  banner, external, globals, stubProcess,
} from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main, format: 'umd', name: pkg.globalName, sourcemap: true, globals: globals(), intro: stubProcess,
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    typescriptRollup({
      typescript,
      useTsconfigDeclarationDir: true,
    }),
    replace({
      '/** @class */': '/*#__PURE__*/',
      delimiters: ['', ''],
    }),
    modify({
      find: /import {(.+)} from 'rrule';/,
      replace: (match, name) => `import rrulePkg from 'rrule/dist/es5/rrule.js'; const {${name}} = rrulePkg;`,
    }),
    license({
      banner,
    }),
  ],
};
