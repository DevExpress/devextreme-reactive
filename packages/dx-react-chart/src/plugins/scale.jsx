import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { domains } from '@devexpress/dx-chart-core';

// eslint-disable-next-line react/prefer-stateless-function
export class Scale extends React.PureComponent {
  render() {
    const { axisExtension } = this.props;
    return (
      <Plugin name="Scale">
        <Getter name="computedDomain" value={domains} />
        <Getter name="axisExtension" value={axisExtension} />
      </Plugin>
    );
  }
}

Scale.propTypes = {
  axisExtension: PropTypes.array,
};

Scale.defaultProps = {
  axisExtension: [],
};
