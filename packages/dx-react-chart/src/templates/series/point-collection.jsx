import * as React from 'react';
import * as PropTypes from 'prop-types';
// TODO: Is it fine to have it hard coded or should there be `path` property?
import { pointAttributes } from '@devexpress/dx-chart-core';

export class PointCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path, // Not used - see note above.
      coordinates,
      point = {},
      style,
      startCoords,
      prepareAnimation,
      animation,
      ...restProps
    } = this.props;
    const getAttributes = pointAttributes(point);
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        style={{ ...style, ...prepareAnimation(animation(item, startCoords)) }}
        {...getAttributes(item)}
        {...item}
        {...restProps}
      />
    )));
  }
}

PointCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
  startCoords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  prepareAnimation: PropTypes.func,
  animation: PropTypes.func,
};

PointCollection.defaultProps = {
  style: undefined,
  prepareAnimation: () => {},
  animation: () => {},
};
