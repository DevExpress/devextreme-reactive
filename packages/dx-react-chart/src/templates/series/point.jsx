import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  pointAttributes, getScatterAnimationStyle, HOVERED, SELECTED,
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
    const { d } = pointAttributes(pointOptions)({});
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={d}
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
  state: PropTypes.string,
  point: PropTypes.object,
  color: PropTypes.string,
  style: PropTypes.object,
  scales: PropTypes.object.isRequired,
  getAnimatedStyle: PropTypes.func.isRequired,
};

RawPoint.defaultProps = {
  state: undefined,
  point: {},
  color: undefined,
  style: undefined,
};

export const Point = withStates({
  [HOVERED]: ({ color, ...restProps }) => ({
    stroke: color,
    strokeWidth: 4,
    fill: 'none',
    // size: 12, Awaiting TODO from above.
    ...restProps,
  }),
  [SELECTED]: ({ color, ...restProps }) => ({
    stroke: color,
    strokeWidth: 4,
    fill: 'none',
    // size: 12, Awaiting TODO from above.
    ...restProps,
  }),
})(RawPoint);
