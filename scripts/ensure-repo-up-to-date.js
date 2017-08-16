const { execSync } = require('child_process');

module.exports = () => {
  console.log('Fetching the latest changes from upstream...');
  const startingGitRevision = execSync('git rev-parse HEAD', { stdio: 'pipe' }).toString();
  execSync('git checkout master', { stdio: 'ignore' });
  execSync('git fetch --tags upstream master', { stdio: 'ignore' });
  execSync('git merge --ff-only upstream/master', { stdio: 'ignore' });
  const currentGitRevision = execSync('git rev-parse HEAD', { stdio: 'pipe' }).toString();
  if (startingGitRevision !== currentGitRevision) {
    console.log('Repo updated. Please, rerun script.');
    process.exit(-1);
  }
}
