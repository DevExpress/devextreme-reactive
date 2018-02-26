const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { prompt } = require('inquirer');
const { valid, lt, inc, prerelease } = require('semver');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const CONVENTIONAL_CHANGELOG_PRESET = 'angular';
const ensureRepoUpToDate = require('./ensure-repo-up-to-date');

const currentBranchName = execSync('git branch', { stdio: 'pipe' })
  .toString()
  .trim()
  .split('\n')
  .filter(line => line.startsWith('*'))[0]
  .slice(2);

ensureRepoUpToDate(currentBranchName);

console.log();
console.log('====================');
console.log(`| Publishing npm packages`);
console.log('====================');
console.log();

const currentVersion = require('../lerna.json').version;
new Promise((resolve) => {
  conventionalRecommendedBump({
    preset: CONVENTIONAL_CHANGELOG_PRESET
  }, (err, result) => {
    resolve(result.releaseType);
  })
})
.then((recommendedReleaseType) => {
  const suggestedVersion = inc(currentVersion, (prerelease(currentVersion) !== null ? 'prerelease' : recommendedReleaseType));

  prompt({
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
  })
  .then(({ version }) => {
    console.log('Cleaning previous build result...');
    execSync(`"./node_modules/.bin/lerna" exec -- node "../../scripts/rm-dist.js"`, { stdio: 'ignore' });

    console.log('Updating versions...');
    const commonPublishArgs = `--exact --repo-version ${version} --force-publish \\* --yes --skip-git`;
    execSync(`"./node_modules/.bin/lerna" publish ${commonPublishArgs} --skip-npm`, { stdio: 'ignore' });

    console.log('Building...');
    execSync('yarn run build', { stdio: 'ignore' });

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

      const suggestedNpmTag = prerelease(version) !== null ? 'next' : 'latest';
      prompt({
        name: 'npmTag',
        message: `Enter npm relase tag:`,
        default: suggestedNpmTag,
        validate: (input) => {
          if(!/^[\w\.\-]*$/.exec(input))
            return 'Tag is invalid';

          return true;
        }
      })
      .then(({ npmTag }) => {
        console.log('Login into npm...');
        try { execSync('npm logout', { stdio: 'ignore' }); } catch (e) {}
        execSync('npm login', { stdio: 'inherit' });

        console.log('Publishing npm...');
        execSync(`"./node_modules/.bin/lerna" publish ${commonPublishArgs} --npm-tag ${npmTag}`, { stdio: 'ignore' });

        console.log('Logout from npm...');
        execSync('npm logout', { stdio: 'ignore' });

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
      });
    });
  });
});
