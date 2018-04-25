import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Marker extends React.PureComponent {
  render() {
    const {
      width, x, y, height, style,
    } = this.props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
        fill: 'red',
        ...style,
      }}
      />
    );
  }
}

Marker.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

Marker.defaultProps = {
  style: null,
  width: 10,
  height: 10,
};

