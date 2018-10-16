import * as React from 'react';
import * as PropTypes from 'prop-types';

// TODO: Is it fine to have it hard coded or should there be `path` property?
export class SliceCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path, // Not used - see note above.
      coordinates,
      ...restProps
    } = this.props;
    const { innerRadius, outerRadius, ...pointOptions } = restProps;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...pointOptions}
        {...item}
      />
    )));
  }
}

SliceCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
