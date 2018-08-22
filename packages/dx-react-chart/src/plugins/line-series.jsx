import * as React from 'react';
import * as PropTypes from 'prop-types';
import { dLine, coordinates } from '@devexpress/dx-chart-core';
import { withSeriesPlugin, withColor } from '../utils';

const Series = ({
  ...props
}) => {
  const {
    seriesComponent: Path,
    ...restProps
  } = props;
  return (
    <Path {...restProps} path={dLine} />
  );
};

export const LineSeries = withSeriesPlugin(
  withColor(Series),
  'LineSeries',
  'line',
  coordinates,
);

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};
