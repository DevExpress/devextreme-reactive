import React from 'react';
import PropTypes from 'prop-types';

export class SliceCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      colorDomain,
      uniqueName,
      ...restProps
    } = this.props;
    const { innerRadius, outerRadius, ...pointOptions } = restProps;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...item}
        {...pointOptions}
        color={colorDomain(item.id)}
      />
    )));
  }
}

SliceCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
