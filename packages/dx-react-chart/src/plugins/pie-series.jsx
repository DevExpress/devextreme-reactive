import { pieAttributes } from '@devexpress/dx-chart-core';
import { makeSeries, withComponents } from '../utils';
import { SliceCollection } from '../templates/series/slice-collection';
import { Slice } from '../templates/series/slice';

export const PieSeries = withComponents({ SliceCollection, Slice })(makeSeries(
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
));
