import * as React from 'react';
import PropTypes from 'prop-types';
import { EmbeddedDemoContext } from '../context';
import { wrapDemo } from './perf-wrapper';

export class DemoRenderer extends React.Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
  }

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
      perfSamplesCount,
    } = this.props;
    const {
      renderDemo,
      unmountDemo,
      demoSources,
      themeSources,
    } = this.context;
    const rootElement = this.rootRef.current;

    if (this.demoRenderSkipped) {
      unmountDemo({
        element: rootElement,
      });
    }

    let demoSource;
    try {
      demoSource = demoSources[sectionName][demoName][themeName].demo;
    } catch (e) {} // eslint-disable-line no-empty

    if (!demoSource) {
      this.demoRenderSkipped = true;
      rootElement.textContent = 'DEMO NOT AVALIABLE!';
      return;
    }

    const demoContainerSource = themeSources
      .find(({ name }) => name === themeName).variants
      .find(({ name }) => name === variantName).DemoContainer;

    renderDemo({
      element: rootElement,
      demo: perfSamplesCount > 0 ? wrapDemo(demoSource, perfSamplesCount) : demoSource,
      demoContainer: demoContainerSource,
    });
    this.demoRenderSkipped = false;
  }

  render() {
    return (
      <div
        ref={this.rootRef}
      />
    );
  }
}

DemoRenderer.propTypes = {
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  variantName: PropTypes.string.isRequired,
  perfSamplesCount: PropTypes.number,
};

DemoRenderer.defaultProps = {
  perfSamplesCount: undefined,
};

DemoRenderer.contextType = EmbeddedDemoContext;
