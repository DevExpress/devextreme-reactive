import {
  getLinePointTransformer as getPointTransformer,
  createSplineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Spline as Path } from '../templates/series/spline';

export const SplineSeries = declareSeries('SplineSeries', {
  components: { Path },
  getPointTransformer,
  createHitTester,
});
