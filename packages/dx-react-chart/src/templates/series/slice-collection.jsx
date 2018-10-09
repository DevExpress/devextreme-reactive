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
      seriesName,
      animation,
      innerRadius,
      outerRadius,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${coordinates[0].x} ${coordinates[0].y})`}>
        {coordinates.map(item => (
          <Point
            key={item.id.toString()}
            style={{ ...style, ...animation(item, seriesName) }}
            {...item}
            {...restProps}
            color={colorDomain(item.id)}
          />
        ))}
      </g>);
  }
}

SliceCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
  seriesName: PropTypes.string.isRequired,
  animation: PropTypes.func,
};

SliceCollection.defaultProps = {
  style: undefined,
  animation: () => {},
};
