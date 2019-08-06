const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { prompt } = require('inquirer');
const { valid, lt, inc, prerelease } = require('semver');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const getCurrentBranchName = require('./get-current-branch-name');
const ensureRepoUpToDate = require('./ensure-repo-up-to-date');
const updatePeerDeps = require('./update-peer-deps');

const CONVENTIONAL_CHANGELOG_PRESET = 'angular';

const script = async () => {
  const currentBranchName = getCurrentBranchName();
  ensureRepoUpToDate(currentBranchName);

  console.log();
  console.log('====================');
  console.log(`| Preparing commit`);
  console.log('====================');
  console.log();

  const currentVersion = require('../lerna.json').version;
  const recommendedReleaseType = await new Promise((resolve) => {
    conventionalRecommendedBump({
      preset: CONVENTIONAL_CHANGELOG_PRESET
    }, (err, result) => {
      resolve(result.releaseType);
    })
  });
  const suggestedVersion = inc(currentVersion, (prerelease(currentVersion) !== null ? 'prerelease' : recommendedReleaseType));
  const { version } = await prompt({
    name: 'version',
    message: `Enter new version [current: ${currentVersion}]:`,
    default: suggestedVersion,
    validate: (input) => {
      if(valid(input) === null)
        return 'Version is invalid';
      if(lt(input, currentVersion))
        return 'New version should be greater than current';

      return true;
    }
  });

  console.log('Generating CHANGELOG.md...');
  const changelogFile = join(process.cwd(), 'CHANGELOG.md');
  execSync(`"./node_modules/.bin/conventional-changelog" -p ${CONVENTIONAL_CHANGELOG_PRESET} -i CHANGELOG.md -s`, { stdio: 'ignore' });
  writeFileSync(
    changelogFile,
    String(readFileSync(changelogFile))
      .replace('name=""', `name="${version}"`)
      .replace('[](', `[${version}](`)
      .replace('...v)', `...v${version})`)
  );

  execSync(`"./node_modules/.bin/lerna" version ${version} --exact --force-publish \* --no-git-tag-version --yes`, { stdio: 'ignore' });
  updatePeerDeps();

  const { commit } = await prompt({
    message: 'Ready to commit. Please check build result and CHANGELOG.md. Is it ok?',
    name: 'commit',
    type: 'confirm',
    default: false,
  });
  if (!commit) {
    console.log('Commit is aborted...');
    return;
  }

  console.log('Preparing pull request...');
  const commitMessage = `chore: publish ${version}`;
  const branchName = `v${version.replace(/\./g, '-')}`;
  execSync(`git checkout -b "${branchName}"`, { stdio: 'ignore' });
  execSync('git add .', { stdio: 'ignore' });
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'ignore' });
  execSync(`git push origin ${branchName}`, { stdio: 'ignore' });
  execSync(`git checkout ${currentBranchName}`, { stdio: 'ignore' });

  console.log();
  console.log('--------------------');
  console.log('Done!');
  console.log();
  console.log(`You have to pull request changes from branch ${branchName}!`);
  console.log(`Don\'t forget to create a release on GitHub!`);
  console.log('--------------------');
  console.log();
};

script();
