import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getPieAnimationStyle } from '@devexpress/dx-chart-core';

// TODO: Is it fine to have it hard coded or should there be `path` property?
export class SliceCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path, // Not used - see note above.
      coordinates,
      index,
      style,
      getAnimatedStyle,
      scales,
      innerRadius,
      outerRadius,
      state,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${coordinates[0].x} ${coordinates[0].y})`}>
        {coordinates.map(item => (
          <Point
            key={item.index.toString()}
            style={getAnimatedStyle(style, getPieAnimationStyle, scales, item)}
            seriesIndex={index}
            {...restProps}
            {...item}
          />
        ))}
      </g>);
  }
}

SliceCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
};

SliceCollection.defaultProps = {
  style: undefined,
};
