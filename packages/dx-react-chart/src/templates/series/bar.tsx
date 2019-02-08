import * as React from 'react';
import {
  dBar, getAreaAnimationStyle, HOVERED, SELECTED, BuildAnimatedStyleGetterFn, Scales,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

type RawBarProps = {
  argument: any,
  value: number,
  x: number,
  barWidth: number,
  maxBarWidth: number,
  y: number,
  y1: number,
  seriesIndex: number,
  index: number,
  state?: string,
  color?: string,
  style?: any,
  scales: Scales,
  getAnimatedStyle: BuildAnimatedStyleGetterFn,
};

class RawBar extends React.PureComponent<RawBarProps> {
  render() {
    const {
      x, barWidth, y, y1, maxBarWidth,
      argument, value, seriesIndex, index, state,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const attributes = dBar({
      x, y, y1, width: maxBarWidth * barWidth,
    });
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

export const Bar = withStates({
  [HOVERED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawBar),
  [SELECTED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawBar),
})(RawBar);
