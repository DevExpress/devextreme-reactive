import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getAreaAnimationStyle } from '@devexpress/dx-chart-core';

export class Path extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      style,
      getAnimatedStyle,
      scales,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        stroke={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

Path.defaultProps = {
  color: undefined,
  style: undefined,
};
