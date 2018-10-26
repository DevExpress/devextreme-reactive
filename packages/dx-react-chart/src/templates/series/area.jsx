import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getAreaAnimationStyle } from '@devexpress/dx-chart-core';

export class Area extends React.PureComponent {
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
        fill={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

Area.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

Area.defaultProps = {
  color: undefined,
  style: undefined,
};
