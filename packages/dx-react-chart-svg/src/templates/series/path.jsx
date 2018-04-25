import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Path extends React.PureComponent {
  render() {
    const {
      x, y, d, style,
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={d}
        style={{
          stroke: 'black',
          strokeWidth: '1px',
          fill: 'none',
          ...style,
        }}
      />
    );
  }
}

Path.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Path.defaultProps = {
  style: null,
};
