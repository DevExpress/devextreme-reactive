import * as React from 'react';
import {
  dBar, getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { BarSeries, TransformedPoint } from '../../types';

type DBar = TransformedPoint & {width: number};

class RawBar extends React.PureComponent<BarSeries.PointProps> {
  render() {
    const {
      x, barWidth, y, y1, maxBarWidth,
      argument, value, seriesIndex, index, state,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const attributes = dBar({
      x, y, y1: y1!, width: maxBarWidth * barWidth,
    } as unknown as DBar);
    return (
      <rect
        {...attributes}
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
