import { join, sep } from 'path';
import { readFileSync, existsSync } from 'fs';
import rimraf from 'rimraf';
import replace from 'replace-in-file';
import dts from 'dts-bundle';

const getIndexDts = (packageDirectory, dtsPath) => {
  let indexDts = join(dtsPath, 'index.d.ts');

  if (!existsSync(indexDts)) {
    const parentDir = packageDirectory.split(sep).pop();
    indexDts = join(dtsPath, parentDir, 'src', 'index.d.ts');
  }

  return indexDts;
};

export default (packageDirectory, skipBundle = false) => {
  const dtsPath = join(packageDirectory, 'dist', 'dts');

  if (!skipBundle) {
    const pkg = JSON.parse(readFileSync(join(packageDirectory, 'package.json')));
    const dtsOutFile = join(packageDirectory, pkg.types);
    const indexDts = getIndexDts(packageDirectory, dtsPath);

    replace.sync({
      files: `${dtsPath}/**/*.ts`,
      from: 'export {};',
      to: '',
    });

    dts.bundle({
      name: pkg.name,
      main: indexDts,
      out: dtsOutFile,
      indent: '  ',
      outputAsModuleFolder: true,
      headerPath: 'none',
    });
  }

  rimraf(dtsPath, () => {});
};
