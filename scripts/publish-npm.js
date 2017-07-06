const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { prompt } = require('inquirer');

prompt({
  name: 'version',
  message: 'Enter version:'
})
.then(({ version }) => {
  console.log('====================');
  console.log(`| Publishing npm packages with version @${version}`);
  console.log('====================');
  console.log();

  // console.log('Fetching the latest changes from upstream...');
  // execSync('git checkout master');
  // execSync('git fetch upstream master');
  // execSync('git merge --ff-only');

  console.log('Cleaning previous build result...');
  const RM_SCRIPT = "require('fs-extra').removeSync(require('path').join(process.cwd(), 'dist'))";
  execSync(`./node_modules/.bin/lerna exec --loglevel silent -- node -e "\\"${RM_SCRIPT}\\""`);

  console.log('Installing dependencies...');
  execSync('npm install');

  console.log('Building...');
  execSync('npm run build');

  console.log('Genereting CHANGELOG.md...');
  const changelogFile = join(process.cwd(), 'CHANGELOG.md');
  execSync('./node_modules/.bin/conventional-changelog -p angular -i CHANGELOG.md -s');
  writeFileSync(
    changelogFile,
    String(readFileSync(changelogFile))
      .replace('name=""', `name="${version}"`)
      .replace('[](', `[${version}](`)
      .replace('...v)', `...v${version})`),
    );
});

