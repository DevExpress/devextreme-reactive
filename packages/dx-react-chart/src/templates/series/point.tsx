import * as React from 'react';
import {
  dSymbol, getScatterAnimationStyle, HOVERED, SELECTED, Scales, BuildAnimatedStyleGetterFn,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';

type RawPointProps = {
  argument: any,
  value: number,
  x: number,
  y: number,
  seriesIndex: number,
  index: number,
  point: { size: number },
  state?: string,
  color?: string,
  style?: any,
  scales: Scales,
  getAnimatedStyle: BuildAnimatedStyleGetterFn,
};
class RawPoint extends React.PureComponent<RawPointProps> {
  render() {
    const {
      x, y,
      argument, value, seriesIndex, index, state,
      point: pointOptions,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={dSymbol(pointOptions)}
        fill={color}
        stroke="none"
        style={getAnimatedStyle(style, getScatterAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

// The expression is used to have 12 from 7 in default scenario
// and to adjust hovered or selected size when custom *point.size* is defined.
const getAdjustedOptions = ({ size }) => ({ size: Math.round(size * 1.7) });

export const Point = withStates({
  [HOVERED]: ({ color, point, ...restProps }) => ({
    stroke: color,
    strokeWidth: 4,
    fill: 'none',
    point: getAdjustedOptions(point),
    ...restProps,
  }),
  [SELECTED]: ({ color, point, ...restProps }) => ({
    stroke: color,
    strokeWidth: 4,
    fill: 'none',
    point: getAdjustedOptions(point),
    ...restProps,
  }),
})(RawPoint);
