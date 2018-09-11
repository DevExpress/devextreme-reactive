import { pieAttributes } from '@devexpress/dx-chart-core';
import * as seriesComponents from '../templates/series';
import { makeSeries } from '../utils';

export const PieSeries = makeSeries(
  'PieSeries',
  'arc',
  null, // TODO: d3Func is not used.
  pieAttributes,
  {
    seriesComponent: {
      name: 'SliceCollection',
      exposedName: 'Path',
    },
    pointComponent: {
      name: 'Slice',
      exposedName: 'Point',
    },
  },
  seriesComponents,
);
