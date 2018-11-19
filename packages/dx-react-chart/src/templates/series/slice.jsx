import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getPieAnimationStyle, HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

class RawSlice extends React.PureComponent {
  render() {
    const {
      x, y, d,
      argument, value, seriesIndex, index, state,
      innerRadius, outerRadius, startAngle, endAngle,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    // TODO: Calculate *d* attribute here.
    return (
      <g transform={`translate(${x} ${y})`}>
        <path
          d={d}
          fill={color}
          stroke="none"
          style={getAnimatedStyle(style, getPieAnimationStyle, scales, { index })}
          {...restProps}
        />
      </g>
    );
  }
}

RawSlice.propTypes = {
  argument: PropTypes.any.isRequired,
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  seriesIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  state: PropTypes.string,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  scales: PropTypes.object.isRequired,
  getAnimatedStyle: PropTypes.func.isRequired,
};

RawSlice.defaultProps = {
  state: undefined,
  color: undefined,
  style: undefined,
};

export const Slice = withStates({
  [HOVERED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawSlice),
  [SELECTED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawSlice),
})(RawSlice);
