import { execSync } from 'child_process';

export default (targetBranchName = 'master') => {
  console.log(`Fetching the latest changes from upstream/${targetBranchName}...`);
  const startingGitRevision = execSync('git rev-parse HEAD', { stdio: 'pipe' }).toString();
  execSync(`git fetch --tags upstream ${targetBranchName}`, { stdio: 'ignore' });
  execSync(`git merge --ff-only upstream/${targetBranchName}`, { stdio: 'ignore' });
  const currentGitRevision = execSync('git rev-parse HEAD', { stdio: 'pipe' }).toString();
  if (startingGitRevision !== currentGitRevision) {
    console.log('Repo updated. Please, rerun script.');
    process.exit(-1);
  }
};
