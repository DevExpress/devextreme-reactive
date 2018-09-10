import React from 'react';
import PropTypes from 'prop-types';
import { pointAttributes, coordinates as computeCoordinates } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, withColor, bindSeriesComponents } from '../utils';

class SeriesComponent extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      point = {},
      ...restProps
    } = this.props;
    const getAttributes = pointAttributes(point);
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...getAttributes(item)}
        {...item}
        {...restProps}
      />
    )));
  }
}

// eslint-disable-next-line react/no-multi-comp
class Series extends React.PureComponent {
  render() {
    const {
      seriesComponent: Path,
      ...restProps
    } = this.props;
    return <Path {...restProps} />;
  }
}

Series.propTypes = {
  seriesComponent: PropTypes.func,
  pointComponent: PropTypes.func.isRequired,
};

Series.defaultProps = {
  seriesComponent: SeriesComponent,
};

const SeriesWithSeries = withSeriesPlugin(
  withColor(Series),
  'ScatterSeries',
  'scatter',
  computeCoordinates,
);

SeriesWithSeries.components = {
  pointComponent: {
    name: 'Point',
    exposedName: 'Point',
  },
};

export const ScatterSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);

ScatterSeries.Path = SeriesComponent;
