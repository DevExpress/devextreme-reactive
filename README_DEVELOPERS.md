# README for Developers

We use the [Fork-and-Branch workflow](http://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/). Start with [forking the repository](https://help.github.com/articles/fork-a-repo/), then create a branch to which you commit modifications.

**Don't clone the main repository!**

[Create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) to the master branche when you are ready to submit your changes. Each pull request should pass all automatic checks and at least one member of the DevExtreme team should [review](https://help.github.com/articles/about-pull-request-reviews/) it.

Make sure that you properly configure your Git [username](https://help.github.com/articles/setting-your-username-in-git) and [email](https://help.github.com/articles/setting-your-email-in-git).

## Install Required Software

To set up a build environment, you need the following software installed:

- [Node.js](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/en/) (or [npm](https://www.npmjs.com/get-npm)). We recommend the LTS versions.
- A web browser for development. We recommend Google Chrome.

## Building

Install packages using `yarn` or `npm`:

    yarn

After installation, the following scripts are available:

- `yarn lint` - Executes linters.
- `yarn test` - Executes tests.
- `yarn test:watch` - Runs an interactive test watcher.
- `yarn build` - Builds DevExtreme Reactive.
- `yarn build:watch` - Builds DevExtreme Reactive in watch mode and runs demos. The following demo ULRs are accessible:

- `http://localhost:3002/` - Grid demos.
- `http://localhost:3004/` - Chart demos.
- `http://localhost:3005/` - Scheduler demos.

Since we are using a [monorepo](https://en.wikipedia.org/wiki/Monorepo),you can execute the described commands from particular packages ('dx-react-core/', './packages/dx-react-grid/' etc).

## Tests and CI



## Commit Message & Pull Request Title Guidelines

We are using the [Conventional Commits](https://www.conventionalcommits.org) specification for PR's naming.
