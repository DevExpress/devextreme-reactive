import * as React from 'react';
import {
  dSymbol, getScatterAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { ScatterSeries } from '../../types';

class RawPoint extends React.PureComponent<ScatterSeries.PointProps> {
  render() {
    const {
      arg, val, isRotated,
      argument, value, seriesIndex, index, state,
      point: pointOptions,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const x = isRotated ? val : arg;
    const y = isRotated ? arg : val;
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

export const Point: React.ComponentType<ScatterSeries.PointProps> = withStates({
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
