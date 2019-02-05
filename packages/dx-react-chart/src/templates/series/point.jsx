import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  dSymbol, getScatterAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';

class RawPoint extends React.PureComponent {
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

RawPoint.propTypes = {
  argument: PropTypes.any.isRequired,
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  seriesIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired,
  state: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  scales: PropTypes.object.isRequired,
  getAnimatedStyle: PropTypes.func.isRequired,
};

RawPoint.defaultProps = {
  state: undefined,
  color: undefined,
  style: undefined,
};

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
