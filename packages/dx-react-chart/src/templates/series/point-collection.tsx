import * as React from 'react';
import * as PropTypes from 'prop-types';

export class PointCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      index,
      state,
      ...restProps // restProps are used because of getAnimatedStyle and scale
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
  index: PropTypes.number.isRequired,
  state: PropTypes.string,
};

PointCollection.defaultProps = {
  state: undefined,
};
