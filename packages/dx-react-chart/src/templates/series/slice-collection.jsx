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
      animation,
      ...restProps
    } = this.props;
    const { innerRadius, outerRadius, ...pointOptions } = restProps;
    const {
      frames, prepareAnimation, options,
    } = animation;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        style={{ ...style, ...prepareAnimation(options(item), frames) }}
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

SliceCollection.defaultProps = {
  style: undefined,
};
