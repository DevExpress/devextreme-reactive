import * as React from 'react';
import {
  getAreaAnimationStyle, HOVERED, SELECTED, dBar,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { BarSeries } from '../../types';

class RawBar extends React.PureComponent<BarSeries.PointProps> {
  render() {
    const {
      arg, val, startVal, barWidth, maxBarWidth,
      argument, value, seriesIndex, index, state, rotated,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const width = barWidth * maxBarWidth;
    return (
      <rect
        {...dBar(arg, val, startVal!, width, rotated)}
        fill={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

// It should actually be `withPattern<BarSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Bar: React.ComponentType<BarSeries.PointProps> = withStates({
  [HOVERED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawBar),
  [SELECTED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawBar),
})(RawBar);
