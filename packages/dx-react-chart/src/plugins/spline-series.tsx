import {
  getLinePointTransformer as getPointTransformer,
  createSplineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Spline as Path } from '../templates/series/spline';
import { AreaSeriesProps } from '../types';

export const SplineSeries = declareSeries<AreaSeriesProps>('SplineSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
