import { fileURLToPath } from 'url';
import { dirname } from 'path';

import buildDefinitions from '../../scripts/merge-dts.js';

buildDefinitions(dirname(fileURLToPath(import.meta.url)));
