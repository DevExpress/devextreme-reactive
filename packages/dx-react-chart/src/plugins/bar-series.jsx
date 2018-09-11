import React from 'react';
import PropTypes from 'prop-types';
import { barCoordinates as computeCoordinates } from '@devexpress/dx-chart-core';
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
  'BarSeries',
  'bar',
  computeCoordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'BarCollection',
    exposedName: 'Path',
  },
  pointComponent: {
    name: 'Bar',
    exposedName: 'Point',
  },
};

export const BarSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
