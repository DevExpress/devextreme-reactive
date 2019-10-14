const visit = require('unist-util-visit');

var splitNameToPath = function(pathPrefix, path) {
  // {prefix}dx-react-grid-bs3/... ==> {prefix}{../../}?react/grid/bs3/...
  const dxPartEnd = path.indexOf('/');
  const dxPart = path.slice(0, dxPartEnd).replace(/dx-/, '');
  return pathPrefix
    + (pathPrefix ? '../'.repeat(dxPart.split('-').length - 1) : '')
    + dxPart.replace(/-/g, '/')
    + path.slice(dxPartEnd);
};

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', node => {
    if (node.url &&
      !node.url.startsWith('//') &&
      !node.url.startsWith('http')
    ) {
      node.url = node.url.replace(/((?:(?:\.\.)\/)+)(dx-.+?\.md)/g, function(match, pathPrefix, path) {
        return splitNameToPath(pathPrefix, path);
      });
    }
  });

  return markdownAST;
};
