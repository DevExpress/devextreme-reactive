import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { domains, computedExtension } from '@devexpress/dx-chart-core';

export class Scale extends React.PureComponent {
  render() {
    const { extension } = this.props;
    const getExtension = () => computedExtension(extension);
    return (
      <Plugin name="Scale">
        <Getter name="computedDomain" value={domains} />
        <Getter name="scaleExtension" computed={getExtension} />
      </Plugin>
    );
  }
}

Scale.propTypes = {
  extension: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    constructor: PropTypes.func,
  })),
};

Scale.defaultProps = {
  extension: [],
};
