import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pointAttributes, coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { withSeriesPlugin } from '../utils/series-helper';

const Series = ({
  ...props
}) => {
  const {
    pointComponent: Point,
    coordinates,
    ...restProps
  } = props;
  return (coordinates.map(item => (<Point
    key={item.id.toString()}
    {...pointAttributes(null, {})(item)}
    {...item}
    {...restProps}
  />)));
};

export const ScatterSeries = withSeriesPlugin(
  Series,
  'ScatterSeries',
  'scatter',
  computeCoordinates,
);

Series.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
