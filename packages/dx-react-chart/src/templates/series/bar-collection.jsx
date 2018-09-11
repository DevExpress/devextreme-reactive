import React from 'react';
import PropTypes from 'prop-types';

export class BarCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path: dBar,
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
