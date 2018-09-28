import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Area extends React.PureComponent {
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
        fill={color}
        style={{ ...style, ...prepareAnimation(animation(undefined, startCoords)) }}
        {...restProps}
      />
    );
  }
}

Area.propTypes = {
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

Area.defaultProps = {
  color: undefined,
  style: undefined,
  prepareAnimation: () => {},
  animation: () => {},
};
