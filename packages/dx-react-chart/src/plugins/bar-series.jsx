import React from 'react';
import PropTypes from 'prop-types';
import { dBar, barCoordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, withColor, bindSeriesComponents } from '../utils';

// TODO: Use `seriesComponent` here.
class Series extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path,
      coordinates,
      ...restProps
    } = this.props;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...item}
        {...dBar(item)}
        {...restProps}
      />
    )));
  }
}

Series.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};

const SeriesWithSeries = withSeriesPlugin(
  withColor(Series),
  'BarSeries',
  'bar',
  computeCoordinates,
);

SeriesWithSeries.components = {
  pointComponent: {
    name: 'Bar',
    exposedName: 'Point',
  },
};

export const BarSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
