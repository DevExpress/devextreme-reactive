const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

module.exports = (mdcFile) => {
  const mdcContent = JSON.parse(fs.readFileSync(mdcFile, 'utf-8'));

  const mustacheOptions = [];

  const rootTemplateFile = path.resolve(process.cwd(), path.dirname(mdcFile), mdcContent.root);
  const rootTemplateContent = fs.readFileSync(rootTemplateFile, 'utf-8');
  mustacheOptions.push(rootTemplateContent);

  mustacheOptions.push(mdcContent.data);

  const partials = Object.keys(mdcContent.partials).reduce((acc, partialName) => {
    const partialFile = path.resolve(process.cwd(), path.dirname(mdcFile), mdcContent.partials[partialName]);
    const partialContent = fs.readFileSync(partialFile, 'utf-8');
    acc[partialName] = partialContent;
    return acc;
  }, {});
  mustacheOptions.push(partials);

  const mdFile = path.join(path.dirname(mdcFile), path.basename(mdcFile).replace('.json', '.g.md'));
  fs.writeFileSync(mdFile, mustache.render(...mustacheOptions), 'utf-8');
};
