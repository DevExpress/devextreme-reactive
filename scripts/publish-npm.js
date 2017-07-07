const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { prompt } = require('inquirer');
const { valid, lt, inc, prerelease } = require('semver');

console.log('====================');
console.log(`| Publishing npm packages`);
console.log('====================');

const currentVersion = require('../lerna.json').version;
const suggestedVersion = inc(currentVersion, (prerelease(currentVersion) !== null ? 'prerelease' : 'patch'));

prompt({
  name: 'version',
  message: `Enter new version [current: ${currentVersion}]:`,
  default: suggestedVersion,
  validate: (input) => {
    if(valid(input) === null)
      return 'Version is invalid';
    if(lt(input, currentVersion))
      return 'New version should be greate than current';

    return true;
  }
})
.then(({ version }) => {
  console.log();

  console.log('Fetching the latest changes from upstream...');
  execSync('git checkout master');
  execSync('git fetch upstream master');
  execSync('git merge --ff-only');

  console.log('Cleaning previous build result...');
  const rmScript = "require('fs-extra').removeSync(require('path').join(process.cwd(),'dist'))";
  execSync(`"./node_modules/.bin/lerna" exec --loglevel silent -- node -e "${rmScript}"`);

  console.log('Installing dependencies...');
  execSync('npm install');

  console.log('Building...');
  execSync('npm run build');

  console.log('Genereting CHANGELOG.md...');
  const changelogFile = join(process.cwd(), 'CHANGELOG.md');
  execSync('"./node_modules/.bin/conventional-changelog" -p angular -i CHANGELOG.md -s');
  writeFileSync(
    changelogFile,
    String(readFileSync(changelogFile))
      .replace('name=""', `name="${version}"`)
      .replace('[](', `[${version}](`)
      .replace('...v)', `...v${version})`)
    );

  prompt({
    message: 'Ready to publish. Please check build result and CHANGELOG.md. Is it ok?',
    name: 'publishNpm',
    type: 'confirm',
    default: false,
  })
  .then(({ publishNpm }) => {
    if (!publishNpm) {
      console.log('Npm publishing is aborted...');
      return;
    }

    console.log('Login into npm...');
    try { execSync('npm logout', { stdio: 'ignore' }); } catch (e) {}
    execSync('npm login', { stdio: 'inherit' });

    console.log('Publishing npm...');
    execSync(`"./node_modules/.bin/lerna" publish --exact --force-publish * --repo-version ${version} --yes --skip-git`);

    console.log('Logout from npm...');
    execSync('npm logout', { stdio: 'ignore' });

    console.log('Preparing pull request...');
    const commitMessage = `chore: publish ${version}`;
    const branchName = `v${version.replace(/\./g, '-')}`;
    execSync(`git checkout -b "${branchName}"`);
    execSync('git add .');
    execSync(`git commit -m "${commitMessage}"`);
    execSync(`git push origin ${branchName}`);
    execSync(`git checkout master`);

    console.log('--------------------');
    console.log(`You have to pull request changes from branch ${branchName}!`);
    console.log(`Don\'t forget to create a release on GitHub!`);
    console.log('--------------------');

    prompt({
      message: 'It is a good point to publish site. Proceed?',
      name: 'publishSite',
      type: 'confirm',
      default: false,
    })
    .then(({ publishSite }) => {
      if (!publishSite) {
        console.log('Site publishing is aborted...');
        return;
      }

      execSync(`npm run publish:site`);
    });
  });
});

