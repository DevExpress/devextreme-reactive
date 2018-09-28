const { join } = require('path');
const { execSync } = require('child_process');
const { copySync, removeSync, readFileSync, writeFileSync } = require('fs-extra');
const { prompt } = require('inquirer');
const { prerelease } = require('semver');
const ensureRepoUpToDate = require('./ensure-repo-up-to-date');
const getCurrentBranchName = require('./get-current-branch-name');

const SITE_PUBLISHING_DIRECTORY = join(process.cwd(), 'tmp');
const BRANCH = 'gh-pages';
const COMMIT_MESSAGE = 'chore: update site';

const script = async () => {
  const currentBranchName = getCurrentBranchName();
  ensureRepoUpToDate(currentBranchName);

  console.log();
  console.log('====================');
  console.log(`| Publishing site`);
  console.log('====================');
  console.log();

  const version = require('../lerna.json').version;
  const suggestedTag = prerelease(version) !== null ? 'next' : 'latest';
  const { tag } = await prompt({
    name: 'tag',
    message: `Enter tag [version: ${version}, write 'latest' to publish site without prefix]:`,
    default: suggestedTag,
  });
  const tagPath = tag !== 'latest' ? `/@${tag}` : '';

  console.log('Building site content...');
  const config = String(readFileSync(join(__dirname, '../packages/dx-site/gatsby-config.js')));
  writeFileSync(join(__dirname, '../packages/dx-site/gatsby-config.js'), config.replace('pathPrefix: \'/devextreme-reactive\'', `pathPrefix: \'/devextreme-reactive${tagPath}\'`));
  execSync('yarn run build:site', { stdio: 'ignore' });

  console.log('Preparing output directory...');
  removeSync(SITE_PUBLISHING_DIRECTORY);
  execSync('git worktree prune');
  execSync(`git worktree add -B ${BRANCH} ${SITE_PUBLISHING_DIRECTORY} upstream/${BRANCH}`, { stdio: 'ignore' });

  console.log('Copying generated site...');
  copySync(join(__dirname, '../packages/dx-site/public/'), join(SITE_PUBLISHING_DIRECTORY, tagPath));

  console.log('Copying github stuff...');
  copySync(join(__dirname, 'gh-pages-files'), SITE_PUBLISHING_DIRECTORY);

  console.log('Publishing...');
  execSync('git add --all', { cwd: SITE_PUBLISHING_DIRECTORY });
  execSync(`git commit -m "${COMMIT_MESSAGE}"`, { cwd: SITE_PUBLISHING_DIRECTORY });
  execSync(`git push upstream ${BRANCH}`, { cwd: SITE_PUBLISHING_DIRECTORY });

  console.log('Cleaning up...');
  removeSync(SITE_PUBLISHING_DIRECTORY);
  execSync('git worktree prune');
  execSync(`git checkout -- ${join(__dirname, '../packages/dx-site/gatsby-config.js')}`)

  console.log();
  console.log('--------------------');
  console.log('Done!');
  console.log();
  console.log(`You have to check that everything is good at https://devexpress.github.io/devextreme-reactive${tagPath}/`);
  console.log('--------------------');
  console.log();
};

script();
