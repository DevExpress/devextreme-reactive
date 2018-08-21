import * as React from 'react';
import * as PropTypes from 'prop-types';
import { dArea, coordinates } from '@devexpress/dx-chart-core';
import { withSeriesPlugin, withColor } from '../utils';

const Series = ({
  ...props
}) => {
  const {
    seriesComponent: Path,
    ...restProps
  } = props;
  return (
    <Path
      path={dArea}
      {...restProps}
    />
  );
};

export const AreaSeries = withSeriesPlugin(
  withColor(Series),
  'AreaSeries',
  'area',
  coordinates,
);

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};
