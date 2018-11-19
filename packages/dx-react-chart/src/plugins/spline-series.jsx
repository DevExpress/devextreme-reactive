import {
  dSpline as path,
  getLinePointTransformer as getPointTransformer,
  createSplineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Path } from '../templates/series/path';

export const SplineSeries = declareSeries('SplineSeries', {
  components: { Path },
  path,
  getPointTransformer,
  createHitTester,
});
