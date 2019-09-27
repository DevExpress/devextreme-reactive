import * as React from 'react';
import { EmbeddedDemoContext } from '../context';

export class DemoCodeProvider extends React.PureComponent {
  getHtml() {
    const { themeName, sectionName, demoName, variantName, perfSamplesCount } = this.props;
    const {
      scriptPath, themeSources, firstPart, lastPart, demoSources,
    } = this.context;
    // console.log(this.context);

    let demoScript = scriptPath;
    if (firstPart !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      const productName = demoSources[sectionName][demoName][themeName].productName;
      demoScript = `${firstPart}${productName}${lastPart}`;
    }

    const themeVariantOptions = themeSources
      .find(theme => theme.name === themeName).variants
      .find(variant => variant.name === variantName);
    const frameUrl = `/demo/${sectionName}/${demoName}/${themeName}/${variantName}`;
    const themeLinks = themeVariantOptions.links
      ? themeVariantOptions.links.map(link => `<link rel="stylesheet" href="${link}">`).join('\n')
      : '';
    const mode = perfSamplesCount > 0 ? `/perf/${perfSamplesCount}` : '/clean';
    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${themeLinks}
        <style>
          body { margin: 8px; overflow: hidden; }
          .panel { margin: 0; }
        </style>
      </head>
      <body>
        <div id="mountPoint"></div>
        <div class="embedded-demo" data-options='{ "path": "${frameUrl}${mode}", "frame": true }'>
          <div style="min-height: 500px;">Loading...</div>
        </div>
        <script src="${demoScript}"></script>
      </body>
      </html>`;
  }

  getCode() {
    const { themeName, sectionName, demoName } = this.props;
    const { demoSources } = this.context;
    return demoSources[sectionName][demoName][themeName].source || '';
  }

  getFileWithDeps(registry, fileName) {
    const files = Object.keys(registry.files).filter(f => f.split('.')[0] === fileName);
    const deps = files.reduce((acc, f) => ([...acc, ...(registry.deps[f] || [])]), []);

    return [...files, ...deps].reduce((acc, file) => ({
      ...acc,
      [file]: registry.files[file],
    }), {});
  }

  getImportedFiles(registry, imported) {
    return imported.reduce((acc, f) => ({
      ...acc,
      ...this.getFileWithDeps(registry, f),
    }), {});
  }

  getHelperFiles() {
    const { themeName, sectionName, demoName } = this.props;
    const { demoSources, themeComponents, demoData } = this.context;
    const importedHelpers = demoSources[sectionName][demoName][themeName].helperFiles;

    return {
      ...this.getImportedFiles(demoData, importedHelpers.demoData),
      ...this.getImportedFiles(themeComponents[themeName], importedHelpers.themeComponents),
    };
  }

  render() {
    const { children } = this.props;
    const html = this.getHtml();
    const code = this.getCode();
    const helperFiles = this.getHelperFiles();
    // console.log('helpers', helperFiles)

    return children({ html, code, helperFiles });
  }
}

DemoCodeProvider.contextType = EmbeddedDemoContext;
