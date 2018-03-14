import * as React from 'react';
import * as PropTypes from 'prop-types';

export class DemoRenderer extends React.Component {
  componentDidMount() {
    this.renderDemo();
  }
  componentDidUpdate() {
    this.renderDemo();
  }
  renderDemo() {
    const {
      sectionName,
      demoName,
      themeName,
      variantName,
    } = this.props;
    const {
      embeddedDemoOptions,
    } = this.context;

    const {
      renderDemo,
      demoSources,
      themeSources,
    } = embeddedDemoOptions;

    let demoSource;
    try {
      demoSource = demoSources[sectionName][demoName][themeName].demo;
    } catch (e) {} // eslint-disable-line no-empty

    const demoContainerSource = themeSources
      .find(({ name }) => name === themeName).variants
      .find(({ name }) => name === variantName).DemoContainer;

    renderDemo({
      element: this.root,
      demo: demoSource,
      demoContainer: demoContainerSource,
      embeddedDemoOptions,
      frameUrl: `/demo/${sectionName}/${demoName}/${themeName}/${variantName}`,
    });
  }
  render() {
    return (
      <div
        ref={(node) => { this.root = node; }}
      />
    );
  }
}

DemoRenderer.propTypes = {
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  variantName: PropTypes.string.isRequired,
};

DemoRenderer.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};
