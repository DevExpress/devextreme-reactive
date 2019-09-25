const { execSync } = require('child_process');
const { prompt } = require('inquirer');
const { prerelease } = require('semver');
const getCurrentBranchName = require('./get-current-branch-name');
const ensureRepoUpToDate = require('./ensure-repo-up-to-date');

const script = async () => {
  const currentBranchName = getCurrentBranchName();
  ensureRepoUpToDate(currentBranchName);

  console.log();
  console.log('====================');
  console.log(`| Publishing npm packages`);
  console.log('====================');
  console.log();

  console.log('Cleaning previous build result...');
  execSync(`"./node_modules/.bin/lerna" exec -- node "../../scripts/rm-dist.js"`, { stdio: 'ignore' });

  console.log('Building...');
  execSync('yarn run build', { stdio: 'ignore' });

  const version = require('../lerna.json').version;
  const { publishNpm } = await prompt({
    message: `Ready to publish version ${version}. Is it ok?`,
    name: 'publishNpm',
    type: 'confirm',
    default: false,
  });
  if (!publishNpm) {
    console.log('Npm publishing is aborted...');
    return;
  }

  const suggestedNpmTag = prerelease(version) !== null ? 'next' : 'latest';
  const { npmTag } = await prompt({
    name: 'npmTag',
    message: `Enter npm relase tag:`,
    default: suggestedNpmTag,
    validate: (input) => {
      if(!/^[\w\.\-]*$/.exec(input))
        return 'Tag is invalid';

      return true;
    }
  });

  console.log('Login into npm...');
  try { execSync('npm logout', { stdio: 'ignore' }); } catch (e) {}
  execSync('npm login', { stdio: 'inherit' });

  console.log('Publishing npm...');
  try {
    execSync(`"./node_modules/.bin/lerna" publish from-package --dist-tag ${npmTag} --yes`, { stdio: 'inherit' });
  } catch (e) {
    console.error(e.message);
    console.error('\n');
    process.exit(1);
  }

  console.log('Logout from npm...');
  execSync('npm logout', { stdio: 'ignore' });

  console.log();
  console.log('--------------------');
  console.log('Done!');
  console.log();
  console.log('Don\'t forget to update samples!');
  console.log('--------------------');
  console.log();
};

script();
