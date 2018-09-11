import React from 'react';
import PropTypes from 'prop-types';
import { pieAttributes } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { withSeriesPlugin, bindSeriesComponents } from '../utils';

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
  seriesComponent: {
    name: 'SliceCollection',
    exposedName: 'Path',
  },
  pointComponent: {
    name: 'Slice',
    exposedName: 'Point',
  },
};

export const PieSeries = bindSeriesComponents(SeriesWithSeries, seriesComponents);
