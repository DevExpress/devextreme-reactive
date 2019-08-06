const { join } = require('path');
const {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync
} = require('fs');

module.exports = () => {
  console.log('Update internal peer dependency versions...');
  const packagesDir = join(__dirname, '../packages');
  const packages = readdirSync(packagesDir);
  const verReplacers = packages.map(package =>
    new RegExp(`(\\"@devexpress/${package}\\"\\s*:\\s*\\")([^\\"]+)(\\")`, 'gi'));

  for (let package of packages) {
    const configPath = join(packagesDir, `${package}/package.json`);

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
