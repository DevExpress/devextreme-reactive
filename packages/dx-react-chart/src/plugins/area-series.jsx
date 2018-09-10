import * as React from 'react';
import * as PropTypes from 'prop-types';
import { dArea, coordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, withColor, bindSeriesComponents } from '../utils';

class Series extends React.PureComponent {
  render() {
    const {
      seriesComponent: Path,
      ...restProps
    } = this.props;
    return <Path path={dArea} {...restProps} />;
  }
}

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};

const SeriesWithSeries = withSeriesPlugin(
  withColor(Series),
  'AreaSeries',
  'area',
  coordinates,
);

SeriesWithSeries.components = {
  seriesComponent: {
    name: 'Area',
    exposedName: 'Path',
  },
};

export const AreaSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
