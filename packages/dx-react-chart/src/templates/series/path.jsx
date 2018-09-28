import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Path extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      style,
      startCoords,
      prepareAnimation,
      animation,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        stroke={color}
        style={{ ...style, ...prepareAnimation(animation(undefined, startCoords)) }}
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
  startCoords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  prepareAnimation: PropTypes.func,
  animation: PropTypes.func,
};

Path.defaultProps = {
  color: undefined,
  style: undefined,
  prepareAnimation: () => {},
  animation: () => {},
};
