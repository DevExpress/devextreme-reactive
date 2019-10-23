import * as React from 'react';
import {
  processPointAnimation, dSymbol, HOVERED, SELECTED, getVisibility,
  isValuesChanged, getPointStart,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withAnimation } from '../../utils/with-animation';
import { ScatterSeries } from '../../types';

class RawPoint extends React.PureComponent<ScatterSeries.PointProps> {
  render() {
    const {
      arg, val, rotated, animation,
      argument, value, seriesIndex, index, state,
      point: pointOptions,
      color, pane,
      scales,
      ...restProps
    } = this.props;
    const x = rotated ? val : arg;
    const y = rotated ? arg : val;
    const visibility = getVisibility(pane, x!, y!, 0, 0);
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={dSymbol(pointOptions)}
        fill={color}
        visibility={visibility}
        stroke="none"
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
})(withAnimation(
  processPointAnimation,
  ({ arg, val }) => ({ arg, val }),
  getPointStart,
  isValuesChanged,
)(RawPoint));
