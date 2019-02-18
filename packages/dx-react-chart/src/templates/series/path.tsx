import * as React from 'react';
import {
  getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { AreaSeries } from '../../types';

class RawPath extends React.PureComponent<AreaSeries.SeriesProps> {
  render() {
    const {
      path,
      coordinates,
      index, state, pointComponent,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <path
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

export const Path: React.ComponentType<AreaSeries.SeriesProps> = withStates({
  [HOVERED]: props => ({ strokeWidth: 4, ...props }),
  [SELECTED]: props => ({ strokeWidth: 4, ...props }),
})(RawPath);
