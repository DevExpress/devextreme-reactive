import * as React from 'react';
import * as PropTypes from 'prop-types';
import { dSpline, coordinates } from '@devexpress/dx-chart-core';
import { withSeriesPlugin, withColor } from '../utils';

const Series = ({
  ...props
}) => {
  const {
    seriesComponent: Path,
    ...restProps
  } = props;
  return (
    <Path {...restProps} path={dSpline} />
  );
};

export const SplineSeries = withSeriesPlugin(
  withColor(Series),
  'SplineSeries',
  'spline',
  coordinates,
);

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};
