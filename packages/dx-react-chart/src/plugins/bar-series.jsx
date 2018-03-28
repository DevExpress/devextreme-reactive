import * as React from 'react';
import * as PropTypes from 'prop-types';
import { baseSeries } from './base-series';

const Series = ({
  attributes, ...props
}) => {
  const {
    pointComponent: Point,
    ...restProps
  } = props;
  const {
    coordinates, scales, height,
  } = attributes;
  const barWidth = scales.xScale.bandwidth();
  return (
    coordinates.map(item =>
      (<Point
        key={item.x.toString()}
        x={item.x}
        y={item.y}
        width={barWidth}
        height={height - item.y}
        {...restProps}
      />
      ))
  );
};

export const BarSeries = baseSeries(Series, 'BarSeries');

Series.propTypes = {
  attributes: PropTypes.object.isRequired,
  pointComponent: PropTypes.func.isRequired,
};
