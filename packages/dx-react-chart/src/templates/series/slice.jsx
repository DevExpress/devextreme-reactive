import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

class RawSlice extends React.PureComponent {
  render() {
    const {
      argument, value, index, seriesIndex, innerRadius, outerRadius, startAngle, endAngle,
      x, y, d, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
        stroke="none"
        d={d}
        {...restProps}
      />
    );
  }
}

RawSlice.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
};

RawSlice.defaultProps = {
  style: {},
  color: undefined,
};

export const Slice = withStates({
  [HOVERED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawSlice),
  [SELECTED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawSlice),
})(RawSlice);
