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
      animation,
      ...restProps
    } = this.props;
    const {
      startCoords, frames, prepareAnimation, options,
    } = animation;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        style={{ ...style, ...prepareAnimation(options(item), frames, startCoords) }}
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

BarCollection.defaultProps = {
  style: undefined,
};
