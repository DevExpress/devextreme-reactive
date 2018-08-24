import * as React from 'react';
import * as PropTypes from 'prop-types';
import { dBar, barCoordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { withSeriesPlugin, withColor } from '../utils';

const Series = ({
  ...props
}) => {
  const {
    pointComponent: Point,
    coordinates,
    path,
    barWidth,
    ...restProps
  } = props;
  return (coordinates.map(item => (
    <Point
      key={item.id.toString()}
      {...item}
      {...dBar(item)}
      {...restProps}
    />
  )));
};

export const BarSeries = withSeriesPlugin(
  withColor(Series),
  'BarSeries',
  'bar',
  computeCoordinates,
);

Series.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
