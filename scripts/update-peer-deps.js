import { join, dirname } from 'path';
import {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { fileURLToPath } from 'url';

export default () => {
  console.log('Update internal peer dependency versions...');
  const packagesDir = join(dirname(fileURLToPath(import.meta.url)), '../packages');
  const packages = readdirSync(packagesDir);
  const verReplacers = packages.map(currentPackage =>
    new RegExp(`(\\"@devexpress/${currentPackage}\\"\\s*:\\s*\\")([^\\"]+)(\\")`, 'gi'));

  for (let currentPackage of packages) {
    const configPath = join(packagesDir, `${currentPackage}/package.json`);

    if (existsSync(configPath)){
      const configStr = readFileSync(configPath).toString();
      const version = JSON.parse(configStr).version;
      let newConfigStr = configStr;

      for (let verReplacer of verReplacers) {
        newConfigStr = newConfigStr.replace(verReplacer, `$1${version}$3`);
      }

      if (newConfigStr !== configStr) {
        writeFileSync(configPath, newConfigStr);
      }
    }
  }
  console.log('Updated!');
};
