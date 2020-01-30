import license from 'rollup-plugin-license';
import typescriptRollup from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import typescript from 'typescript';
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
      include: [
        '*.ts+(|x)',
        '**/*.ts+(|x)',
        '../dx-react-grid/src/plugins/internal/*.ts+(|x)',
      ],
    }),
    replace({
      '/** @class */': '/*#__PURE__*/',
      delimiters: ['', ''],
    }),
    license({
      banner,
    }),
  ],
};
