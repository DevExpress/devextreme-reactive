import React from 'react';
import PropTypes from 'prop-types';

export class PointCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path: pointAttributes,
      coordinates,
      point = {},
      ...restProps
    } = this.props;
    const getAttributes = pointAttributes(point);
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...getAttributes(item)}
        {...item}
        {...restProps}
      />
    )));
  }
}

PointCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
