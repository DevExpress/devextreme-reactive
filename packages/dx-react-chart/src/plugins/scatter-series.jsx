import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pointAttributes, coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import { withSeriesPlugin, withColor } from '../utils';

const Series = ({
  ...props
}) => {
  const {
    pointComponent: Point,
    coordinates,
    point = {},
    ...restProps
  } = props;
  const getAttributes = pointAttributes(point);
  return (coordinates.map(item => (
    <Point
      key={item.id.toString()}
      {...getAttributes(item)}
      {...item}
      {...restProps}
    />
  )));
};

const BaseSeries = ({ Path, path, ...props }) => <Path {...props} />;

BaseSeries.propTypes = {
  Path: PropTypes.func,
  path: PropTypes.func,
};

BaseSeries.defaultProps = {
  Path: Series,
  path: null,
};

export const ScatterSeries = withSeriesPlugin(
  withColor(BaseSeries),
  'ScatterSeries',
  'scatter',
  computeCoordinates,
);

ScatterSeries.Path = Series;

Series.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
