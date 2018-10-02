import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { computeDomains, computeExtension } from '@devexpress/dx-chart-core';

export class Scale extends React.PureComponent {
  render() {
    const { extensions } = this.props;
    return (
      <Plugin name="Scale">
        <Getter name="computeDomains" value={computeDomains} />
        <Getter name="scaleExtension" value={computeExtension(extensions)} />
      </Plugin>
    );
  }
}

Scale.propTypes = {
  extensions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    constructor: PropTypes.func,
  })),
};

Scale.defaultProps = {
  extensions: [],
};
