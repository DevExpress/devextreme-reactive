import React from 'react';
import PropTypes from 'prop-types';
import { dLine, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, withColor, bindSeriesComponents } from '../utils';

class Series extends React.PureComponent {
  render() {
    const {
      seriesComponent: Path,
      ...restProps
    } = this.props;
    return <Path path={dLine} {...restProps} />;
  }
}

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};

const SeriesWithSeries = withSeriesPlugin(
  withColor(Series),
  'LineSeries',
  'line',
  coordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'Path',
    exposedName: 'Path',
  },
};

export const LineSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
