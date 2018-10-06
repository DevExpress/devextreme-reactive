import * as React from 'react';
import * as PropTypes from 'prop-types';

// TODO: Is it fine to have it hard coded or should there be `path` property?
export class SliceCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path, // Not used - see note above.
      coordinates,
      colorDomain,
      uniqueName,
      style,
      animationName,
      animation,
      ...restProps
    } = this.props;
    const { innerRadius, outerRadius, ...pointOptions } = restProps;
    const styles = animation(animationName);
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        style={{ ...style, ...styles(item) }}
        {...item}
        {...pointOptions}
        color={colorDomain(item.id)}
      />
    )));
  }
}

SliceCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
  animationName: PropTypes.string.isRequired,
  animation: PropTypes.func,
};

SliceCollection.defaultProps = {
  style: undefined,
  animation: () => () => {},
};
