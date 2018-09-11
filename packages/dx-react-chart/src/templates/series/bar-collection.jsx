import React from 'react';
import PropTypes from 'prop-types';
// TODO: Is it fine to have it hard coded or should there be `path` property?
import { dBar } from '@devexpress/dx-chart-core';

export class BarCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      ...restProps
    } = this.props;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...item}
        {...dBar(item)}
        {...restProps}
      />
    )));
  }
}

BarCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
