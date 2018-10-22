import { getPiePointTransformer, createPieHitTester } from '@devexpress/dx-chart-core';
import { makeSeries, withComponents } from '../utils';
import { SliceCollection as Path } from '../templates/series/slice-collection';
import { Slice as Point } from '../templates/series/slice';

export const PieSeries = withComponents({ Path, Point })(makeSeries(
  'PieSeries',
  'arc',
  null, // TODO: d3Func is not used.
  getPiePointTransformer,
  {
    seriesComponent: 'Path',
    pointComponent: 'Point',
  },
  createPieHitTester,
));
