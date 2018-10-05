import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Path extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      style,
      animation,
      ...restProps
    } = this.props;
    const {
      startCoords, frames, prepareAnimation, options,
    } = animation;
    return (
      <path
        d={path(coordinates)}
        stroke={color}
        style={{ ...style, ...prepareAnimation(options(), frames, startCoords) }}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  animation: PropTypes.shape({
    startCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    frames: PropTypes.string,
    prepareAnimation: PropTypes.func,
    options: PropTypes.func,
  }).isRequired,
};

Path.defaultProps = {
  color: undefined,
  style: undefined,
};
