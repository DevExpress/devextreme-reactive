import * as React from 'react';
import {
  getPieAnimationStyle, dPie, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { PieSeries } from '../../types';

class RawSlice extends React.PureComponent<PieSeries.PointProps> {
  render() {
    const {
      arg: x, val: y, rotated,
      argument, value, seriesIndex, index, state, maxRadius,
      innerRadius, outerRadius, startAngle, endAngle,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${x} ${y})`}>
        <path
          d={dPie(this.props)}
          fill={color}
          stroke="none"
          style={getAnimatedStyle(
            style,
            getPieAnimationStyle,
            scales,
            this.props,
          )}
          {...restProps}
        />
      </g>
    );
  }
}

// It should actually be `withPattern<PieSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Slice: React.ComponentType<PieSeries.PointProps> = withStates({
  [HOVERED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawSlice),
  [SELECTED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawSlice),
})(RawSlice);
