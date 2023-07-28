import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import buildDefinitions from '../../scripts/merge-dts.js';
import { copyCommonJsTypes, getPackageInfo } from '../../scripts/utils.js';

const packageDirectory = dirname(fileURLToPath(import.meta.url));
const pkg = getPackageInfo(packageDirectory);
const dtsOutFile = join(packageDirectory, pkg.types);

buildDefinitions(packageDirectory, true);
copyCommonJsTypes(dtsOutFile);
