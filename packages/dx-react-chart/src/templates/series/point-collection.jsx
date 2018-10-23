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
      ...restProps
    } = this.props;
    const getAttributes = pointAttributes(point);
    return (coordinates.map(item => (
      <Point
        key={item.index.toString()}
        {...restProps}
        {...getAttributes(item)}
        {...item}
      />
    )));
  }
}

PointCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
