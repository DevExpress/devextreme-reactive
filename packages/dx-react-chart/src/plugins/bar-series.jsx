import * as React from 'react';
import * as PropTypes from 'prop-types';
import { baseSeries } from './base-series';

class Series extends React.PureComponent {
  render() {
    const { attributes, ...props } = this.props;
    const {
      pointComponent: Point,
      ...restProps
    } = props;
    const {
      coordinates, scales, stack,
    } = attributes;

    const bandwidth = scales.x0Scale.bandwidth();
    const offset = scales.x0Scale(stack);
    return (
      coordinates.map(item =>
        (
          <Point
            key={item.id.toString()}
            x={item.x + offset}
            y={item.y}
            width={bandwidth}
            height={item.y1 - item.y}
            {...restProps}
          />
        ))
    );
  }
}

export const BarSeries = baseSeries(Series, 'BarSeries');

Series.propTypes = {
  attributes: PropTypes.shape({
    coordinates: PropTypes.array,
    scales: PropTypes.object,
    stack: PropTypes.string,
  }).isRequired,
  pointComponent: PropTypes.func.isRequired,
};
