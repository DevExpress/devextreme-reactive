import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Marker extends React.PureComponent {
  render() {
    const {
      width, height, style, margin,
    } = this.props;
    return (
      <svg width={width} height={height} style={{ margin }}>
        <rect
          width={width}
          height={height}
          style={{
            fill: 'red',
            ...style,
          }}
        />
      </svg>
    );
  }
}

Marker.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  margin: PropTypes.number.isRequired,
};

Marker.defaultProps = {
  style: null,
  width: 10,
  height: 10,
};
