import { pieAttributes, getPieItems, getPieStartCoordinates } from '@devexpress/dx-chart-core';
import { makeSeries, withComponents } from '../utils';
import { SliceCollection as Path } from '../templates/series/slice-collection';
import { Slice as Point } from '../templates/series/slice';

export const PieSeries = withComponents({ Path, Point })(makeSeries(
  'PieSeries',
  'arc',
  null, // TODO: d3Func is not used.
  pieAttributes,
  { getStartCoordinates: getPieStartCoordinates, animationName: 'transformPie' },
  {
    seriesComponent: 'Path',
    pointComponent: 'Point',
  },
  undefined,
  getPieItems,
));
