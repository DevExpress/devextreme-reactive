import * as React from 'react';
import * as PropTypes from 'prop-types';

export class PointCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      index,
      state,
      ...restProps
    } = this.props;
    return (coordinates.map(point => (
      <Point
        key={String(point.index)}
        seriesIndex={index}
        {...restProps}
        {...point}
      />
    )));
  }
}

PointCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
};
