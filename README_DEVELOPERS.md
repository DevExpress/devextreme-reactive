# README for Developers

We use the [Fork-and-Branch workflow](http://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/). Start with [forking the repository](https://help.github.com/articles/fork-a-repo/), then create a branch to which you commit modifications.

**Do not clone the main repository**

[Create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) to the `master` branch when you are ready to submit your changes. Each pull request should pass all automatic checks and at least one member of the DevExtreme team should [review](https://help.github.com/articles/about-pull-request-reviews/) it.

Make sure that you properly configure your Git [username](https://help.github.com/articles/setting-your-username-in-git) and [email](https://help.github.com/articles/setting-your-email-in-git).

## Install Required Software

To set up a build environment, you need the following software installed:

- [Node.js](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/) (or [npm](https://www.npmjs.com/get-npm)). We recommend the LTS versions.
- A web browser for development. We recommend Google Chrome.

## Building

Run the following command to install packages:

    yarn
    
or

    npm install

After installation, the following commands are available:

- `yarn lint` or `npm run lint` - Executes linters
- `yarn test` or `npm run test` - Runs tests
- `yarn test:watch` or `npm run test:watch` - Runs an interactive test watcher
- `yarn build`  or `npm run build` - Builds DevExtreme Reactive
- `yarn build:watch`  or `npm run build:watch` - Builds DevExtreme Reactive in watch mode and runs demos. The following demo URLs are accessible:

  - `http://localhost:3002/` - Grid demos
  - `http://localhost:3004/` - Chart demos
  - `http://localhost:3005/` - Scheduler demos

We use a [monorepo](https://en.wikipedia.org/wiki/Monorepo), and you can execute the described commands from individual packages (`./packages/dx-react-core/`, `./packages/dx-react-grid/`, and so on).

## Tests and CI

We adhere to the [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) paradigm. It follows a simple rule: each PR should contain a test if possible. It means that if a PR fixes a bug, it should contain a [regression test](https://en.wikipedia.org/wiki/Regression_testing); if a PR implements a new functionality, it should contain tests for it, and so on.

We recommend running tests and executing linters locally before you submit a PR.

## Commit Message & Pull Request Title Guidelines

We use the [Conventional Commits](https://www.conventionalcommits.org) specification for commit messages and PR titles. You should make sure that your PR also follows it.
