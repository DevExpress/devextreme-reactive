// eslint-disable-next-line import/no-extraneous-dependencies
const visit = require('unist-util-visit');

const splitNameToPath = (pathPrefix, path) => {
  // {prefix}dx-react-grid-bs3/... ==> {prefix}{../../}?react/grid/bs3/...
  const dxPartEnd = path.indexOf('/');
  const dxPart = path.slice(0, dxPartEnd).replace(/dx-/, '');
  return pathPrefix
    + (pathPrefix ? '../'.repeat(dxPart.split('-').length - 1) : '')
    + dxPart.replace(/-/g, '/')
    + path.slice(dxPartEnd);
};

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', (node) => {
    if (node.url
      && !node.url.startsWith('//')
      && !node.url.startsWith('http')
    ) {
      // eslint-disable-next-line no-param-reassign
      node.url = node.url.replace(/((?:(?:\.\.)\/)+)(dx-.+?\.md)/g, (match, pathPrefix, path) => splitNameToPath(pathPrefix, path));
    }
  });

  return markdownAST;
};
