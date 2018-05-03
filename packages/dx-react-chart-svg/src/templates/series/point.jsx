import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Point extends React.PureComponent {
  render() {
    const {
      x, y, d, style,
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={d}
        style={{
          stroke: 'none',
          strokeWidth: '1px',
          fill: 'black',
          ...style,
        }}
      />
    );
  }
}

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Point.defaultProps = {
  style: null,
};
