import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Point extends React.PureComponent {
  render() {
    const {
      argument, value, index, x, y, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
        transform={`translate(${x} ${y})`}
        {...restProps}
      />
    );
  }
}

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Point.defaultProps = {
  color: undefined,
};
