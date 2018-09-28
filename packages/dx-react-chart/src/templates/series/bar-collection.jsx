import * as React from 'react';
import * as PropTypes from 'prop-types';
// TODO: Is it fine to have it hard coded or should there be `path` property?
import { dBar } from '@devexpress/dx-chart-core';

export class BarCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path, // Not used - see note above.
      coordinates,
      style,
      startCoords,
      prepareAnimation,
      animation,
      ...restProps
    } = this.props;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        style={{ ...style, ...prepareAnimation(animation(item, startCoords)) }}
        {...item}
        {...dBar(item)}
        {...restProps}
      />
    )));
  }
}

BarCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
  startCoords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  prepareAnimation: PropTypes.func,
  animation: PropTypes.func,
};

BarCollection.defaultProps = {
  style: undefined,
  prepareAnimation: () => {},
  animation: () => {},
};
