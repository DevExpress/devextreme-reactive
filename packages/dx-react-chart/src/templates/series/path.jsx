import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  getAreaAnimationStyle, DEFAULT, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';

class RawPath extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      index,
      style,
      getAnimatedStyle,
      scales,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        fill="none"
        strokeWidth={2}
        stroke={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

RawPath.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

RawPath.defaultProps = {
  color: undefined,
  style: undefined,
};

// Shouldn't *RawPath* have something like *thickness*  property so that HOVERED and SELECTED
// states would address it rather then *strokeWidth* property?

export const Path = withStates({
  [DEFAULT]: props => props,
  [HOVERED]: props => ({ strokeWidth: 4, ...props }),
  [SELECTED]: props => ({ strokeWidth: 4, ...props }),
})(RawPath);
