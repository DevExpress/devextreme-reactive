import React from 'react';
import PropTypes from 'prop-types';
import { coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, withColor, bindSeriesComponents } from '../utils';

class Series extends React.PureComponent {
  render() {
    const {
      seriesComponent: Path,
      ...restProps
    } = this.props;
    // TODO: `path` property should be passed.
    return <Path {...restProps} />;
  }
}

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};

const SeriesWithSeries = withSeriesPlugin(
  withColor(Series),
  'ScatterSeries',
  'scatter',
  computeCoordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'PointCollection',
    exposedName: 'Path',
  },
  pointComponent: {
    name: 'Point',
    exposedName: 'Point',
  },
};

export const ScatterSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
