import * as React from 'react';
import { EmbeddedDemoContext } from '../context';

const getThemeVariantOptions = (props) => {
  const {
    themeName,
    variantName,
    themeSources,
  } = props;

  return themeSources
    .find(theme => theme.name === themeName).variants
    .find(variant => variant.name === variantName);
};

export class DemoCodeProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editableLink: getThemeVariantOptions(props).editableLink,
    };
  }

  getHtml() {
    const { themeName, sectionName, demoName, variantName, perfSamplesCount } = this.props;
    const {
      scriptPath,
    } = this.context;

    let demoScript = scriptPath;

    const themeLinks = this.getThemeLinks();
    const frameUrl = `/demo/${sectionName}/${demoName}/${themeName}/${variantName}`;
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

  getSandboxHtml() {
    return `${this.getThemeLinks()}
<div id="root"></div>
`;
  }

  getThemeLinks() {
    const { editableLink } = this.state;
    const themeVariantOptions = getThemeVariantOptions(this.props);
    const links = [
      ...(themeVariantOptions.links || []),
      (editableLink ? [editableLink] : []),
    ];
    return links.length
      ? links
        .filter(l => !!l)
        .map(link => `<link rel="stylesheet" href="${link}">`)
        .join('\n')
      : '';
  }

  getCode() {
    return (this.getDemoConfig().source || '')
      .replace('<>', '<React.Fragment>')
      .replace('</>', '</React.Fragment>');
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

  getDemoConfig() {
    const { themeName, sectionName, demoName } = this.props;
    const { demoSources } = this.context;
    return demoSources[sectionName][demoName][themeName];
  }

  getHelperFiles() {
    const { themeName } = this.props;
    const { themeComponents, demoData } = this.context;
    const { helperFiles: importedHelpers, productName } = this.getDemoConfig();

    return {
      ...this.getImportedFiles(demoData[productName], importedHelpers.demoData),
      ...this.getImportedFiles(
        themeComponents[productName][themeName],
        importedHelpers.themeComponents,
      ),
    };
  }

  getExternalDependencies() {
    const { demoData } = this.context;
    const { helperFiles: { externalDeps }, productName } = this.getDemoConfig();
    const { depsVersions } = demoData[productName];

    return externalDeps.reduce((acc, dep) => ({
      ...acc,
      [dep]: depsVersions[dep],
    }), {});
  }

  onEditableLinkChange(editableLink) {
    this.setState({ editableLink });
  }

  static getDerivedStateFromProps(props, state) {
    const { editableLink } = state.editableLink ? state : getThemeVariantOptions(props);
    return { editableLink };
  }

  render() {
    const { children } = this.props;
    const html = this.getHtml();
    const sandboxHtml = this.getSandboxHtml();
    const code = this.getCode();
    const helperFiles = this.getHelperFiles();
    const externalDeps = this.getExternalDependencies();
    const { requireTs } = this.getDemoConfig();
    const onEditableLinkChange = this.onEditableLinkChange.bind(this);
    const { editableLink } = this.state;

    return children({
      html, sandboxHtml, code, helperFiles, externalDeps, requireTs,
      onEditableLinkChange, editableLink,
    });
  }
}

DemoCodeProvider.contextType = EmbeddedDemoContext;
