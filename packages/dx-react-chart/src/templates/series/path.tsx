import * as React from 'react';
import {
  getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { PathComponentPathProps } from '../../types';

class RawPath extends React.PureComponent<PathComponentPathProps> {
  render() {
    const {
      path,
      coordinates, rotated,
      index, state, pointComponent,
      color, clipPathId,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <path
        clipPath={`url(#${clipPathId})`}
        d={path!(coordinates)}
        fill="none"
        strokeWidth={2}
        stroke={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

export const Path = withStates({
  [HOVERED]: props => ({ strokeWidth: 4, ...props }),
  [SELECTED]: props => ({ strokeWidth: 4, ...props }),
})(RawPath);
