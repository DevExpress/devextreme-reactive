const { join } = require('path');
const { execSync } = require('child_process');
const { copySync, removeSync, writeFileSync } = require('fs-extra');
const { prompt } = require('inquirer');
const { prerelease } = require('semver');
const ensureRepoUpToDate = require('./ensure-repo-up-to-date');
const getCurrentBranchName = require('./get-current-branch-name');

const SITE_DIRECTORY = join(process.cwd(), 'site');
const GENERATED_SITE_DIRECTORY = join(process.cwd(), 'site/_site');
const GENERATED_CONFIG = '_config.g.yml';
const GENERATED_CONFIG_PATH = join(SITE_DIRECTORY, GENERATED_CONFIG);
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
  execSync('yarn run build', { stdio: 'ignore' });
  execSync('yarn run build:site', { stdio: 'ignore', env: { ...process.env, VERSION_TAG: tag } });

  console.log('Cleaning generated site...');
  removeSync(GENERATED_SITE_DIRECTORY);

  console.log('Generating site...');
  writeFileSync(GENERATED_CONFIG_PATH, `baseurl: "/devextreme-reactive${tagPath}"\nversion: ${version}`);
  execSync('bundle install', { cwd: SITE_DIRECTORY, stdio: 'ignore' });
  execSync(
    `bundle exec jekyll build --config _config.yml,${GENERATED_CONFIG} --source ${SITE_DIRECTORY} --destination ${GENERATED_SITE_DIRECTORY}`,
    { cwd: SITE_DIRECTORY, stdio: 'ignore' },
  );

  console.log('Preparing output directory...');
  removeSync(SITE_PUBLISHING_DIRECTORY);
  execSync('git worktree prune');
  execSync(`git worktree add -B ${BRANCH} ${SITE_PUBLISHING_DIRECTORY} upstream/${BRANCH}`, { stdio: 'ignore' });

  console.log('Copying generated site...');
  copySync(GENERATED_SITE_DIRECTORY, join(SITE_PUBLISHING_DIRECTORY, tagPath));

  console.log('Copying github stuff...');
  copySync(join(__dirname, 'gh-pages-files'), SITE_PUBLISHING_DIRECTORY);

  console.log('Publishing...');
  execSync('git add --all', { cwd: SITE_PUBLISHING_DIRECTORY });
  execSync(`git commit -m "${COMMIT_MESSAGE}"`, { cwd: SITE_PUBLISHING_DIRECTORY });
  execSync(`git push upstream ${BRANCH}`, { cwd: SITE_PUBLISHING_DIRECTORY });

  console.log('Cleaning up...');
  removeSync(GENERATED_CONFIG_PATH);
  removeSync(SITE_PUBLISHING_DIRECTORY);
  execSync('git worktree prune');

  console.log();
  console.log('--------------------');
  console.log('Done!');
  console.log();
  console.log(`You have to check that everything is good at https://devexpress.github.io/devextreme-reactive${tagPath}/`);
  console.log('--------------------');
  console.log();
};

script();
