import React from 'react';
import PropTypes from 'prop-types';
import { pieAttributes } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, bindSeriesComponents } from '../utils';

// TODO: Use `seriesComponent` here.
class Series extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      colorDomain,
      uniqueName,
      ...restProps
    } = this.props;
    const { innerRadius, outerRadius, ...pointOptions } = restProps;
    return (coordinates.map(item => (
      <Point
        key={item.id.toString()}
        {...item}
        {...pointOptions}
        color={colorDomain(item.id)}
      />
    )));
  }
}

Series.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Series.defaultProps = {
  style: {},
};

const SeriesWithSeries = withSeriesPlugin(
  Series,
  'PieSeries',
  'arc',
  pieAttributes,
);

SeriesWithSeries.components = {
  pointComponent: {
    name: 'Slice',
    exposedName: 'Point',
  },
};

export const PieSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
