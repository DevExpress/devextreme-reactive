import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';

class RawPoint extends React.PureComponent {
  render() {
    const {
      argument, value, index, x, y, color, ...restProps
    } = this.props;
    // *d* attribute is calculated during points scaling.
    // TODO: Do it here - d={path().size(size).type(type)()}
    return (
      <path
        fill={color}
        stroke="none"
        transform={`translate(${x} ${y})`}
        {...restProps}
      />
    );
  }
}

RawPoint.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

RawPoint.defaultProps = {
  color: undefined,
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
