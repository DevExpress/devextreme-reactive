import * as React from 'react';
import {
  dArea, dRotatedArea, getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { AreaSeries } from '../../types';

class RawArea extends React.PureComponent<AreaSeries.SeriesProps> {
  render() {
    const {
      path,
      coordinates,
      index, state, pointComponent,
      color,
      style, scales, getAnimatedStyle, isRotated,
      ...restProps
    } = this.props;
    const thePath = path !== undefined ? path : (isRotated ? dRotatedArea : dArea);
    return (
      <path
        d={thePath(coordinates)}
        fill={color}
        opacity={0.5}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

// It should actually be `withPattern<AreaSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Area: React.ComponentType<AreaSeries.SeriesProps> = withStates({
  [HOVERED]: withPattern<any>(
    ({ index }) => `series-${index}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern<any>(
    ({ index }) => `series-${index}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea);
