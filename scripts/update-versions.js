const {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
} = require('fs');
const { join } = require('path');

const ROOT_PATH = join(process.cwd(), 'packages');

module.exports = version => {
  const packages = readdirSync(ROOT_PATH)
    .forEach(package => {
      const targetFile = join(ROOT_PATH, package, 'package.json');
      if (!existsSync(targetFile)) return;
      writeFileSync(targetFile, String(readFileSync(targetFile))
        .replace(/("version":\s)"[-\d.\w]+"/g, `$1"${version}"`)
        .replace(/("@devexpress.+":\s)"[-\d.\w]+"/g, `$1"${version}"`));
    });
}
