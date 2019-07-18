import * as React from 'react';
import { EmbeddedDemoContext } from '../context';

export class DemoCodeProvider extends React.PureComponent {
  getHtml() {
    const { themeName, sectionName, demoName, variantName, perfSamplesCount } = this.props;
    const {
      scriptPath, themeSources, firstPart, lastPart, demoSources,
    } = this.context;
    console.log(this.context);

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

  getHelperFiles() {
    const { themeName, sectionName, demoName } = this.props;
    const { demoSources, themeComponents } = this.context;
    const importedHelpers = demoSources[sectionName][demoName][themeName].helperFiles;
    const themeSources = importedHelpers.themeComponents.map(helper => themeComponents[themeName][helper]);

    return {
      ...(themeSources.length && { themeSources }),
    };
  }

  render() {
    const { children } = this.props;
    const html = this.getHtml();
    const code = this.getCode();
    const helperFiles = this.getHelperFiles();
    console.log(helperFiles)

    return children({ html, code });
  }
}

DemoCodeProvider.contextType = EmbeddedDemoContext;
