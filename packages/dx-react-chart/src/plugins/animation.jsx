import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import {
  getAnimation,
  mergeExtensionsWithDefault,
} from '@devexpress/dx-chart-core';

export class Animation extends React.PureComponent {
  render() {
    const { extensions } = this.props;
    const getExtensions = () => mergeExtensionsWithDefault(extensions);
    return (
      <Plugin name="Animation">
        <Getter name="animationExtensions" computed={getExtensions} />
        <Getter name="getAnimation" value={getAnimation} />
      </Plugin>
    );
  }
}

Animation.propTypes = {
  extensions: PropTypes.array,
};

Animation.defaultProps = {
  extensions: [],
};
