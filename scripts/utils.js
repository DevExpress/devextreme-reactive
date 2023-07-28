import { existsSync, copyFileSync, readFileSync } from 'fs';
import { join } from 'path';

const getCommonJsTypesPath = dtsPath => dtsPath.replace(/\.ts$/, '.cts');

export const copyCommonJsTypes = (dtsPath) => {
  if (existsSync(dtsPath)) {
    copyFileSync(dtsPath, getCommonJsTypesPath(dtsPath));
  }
};

export const getPackageInfo = packageDir => JSON.parse(readFileSync(join(packageDir, 'package.json')));
