import * as React from 'react';
import {
  dPie, HOVERED, SELECTED, processPieAnimation, isValuesChanged, getDelay,
  getPieStart,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { withAnimation } from '../../utils/with-animation';
import { PieSeries } from '../../types';

class RawSlice extends React.PureComponent<PieSeries.PointProps> {
  render() {
    const {
      arg, val, rotated,
      argument, value, seriesIndex, index, state, maxRadius,
      innerRadius, outerRadius, startAngle, endAngle,
      color, animation, pane,
      scales,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${arg} ${val})`}>
        <path
          d={dPie(maxRadius, innerRadius, outerRadius,
            startAngle, endAngle)}
          fill={color}
          stroke="none"
          {...restProps}
        />
      </g>
    );
  }
}

// It should actually be `withPattern<PieSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Slice: React.ComponentType<PieSeries.PointProps> = withAnimation<any>(
  processPieAnimation,
  ({ innerRadius, outerRadius, startAngle, endAngle }) =>
  ({ innerRadius, outerRadius, startAngle, endAngle }),
  getPieStart,
  isValuesChanged,
  getDelay,
)(withStates({
  [HOVERED]: withPattern<any>(
    ({ seriesIndex, index, color }) =>
    `series-${seriesIndex}-point-${index}-color-${color}-hover`, { opacity: 0.75 },
  )(RawSlice),
  [SELECTED]: withPattern<any>(
    ({ seriesIndex, index, color }) =>
    `series-${seriesIndex}-point-${index}-color-${color}-selection`, { opacity: 0.5 },
  )(RawSlice),
})(RawSlice));
