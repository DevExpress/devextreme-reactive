import * as React from 'react';
import {
  getPieAnimationStyle, dPie, HOVERED, SELECTED, Scales, BuildAnimatedStyleGetterFn,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

type RawSliceProps = {
  argument: any,
  value: number,
  x: number,
  y: number,
  seriesIndex: number,
  index: number,
  state?: string,
  innerRadius: number,
  outerRadius: number,
  maxRadius: number,
  startAngle: number,
  endAngle: number,
  color?: string,
  style?: any,
  scales: Scales,
  getAnimatedStyle: BuildAnimatedStyleGetterFn,
};

class RawSlice extends React.PureComponent<RawSliceProps> {
  render() {
    const {
      x, y,
      argument, value, seriesIndex, index, state, maxRadius,
      innerRadius, outerRadius, startAngle, endAngle,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${x} ${y})`}>
        <path
          d={dPie({
            maxRadius, innerRadius, outerRadius, startAngle, endAngle,
          })}
          fill={color}
          stroke="none"
          style={getAnimatedStyle(style, getPieAnimationStyle, scales, { index })}
          {...restProps}
        />
      </g>
    );
  }
}

export const Slice = withStates({
  [HOVERED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawSlice),
  [SELECTED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawSlice),
})(RawSlice);
