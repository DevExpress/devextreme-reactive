import {
  dSpline as path,
  getAreaPointTransformer as getPointTransformer,
  createSplineHitTester as createHitTester,
  getPointDElement as getDElement,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Path } from '../templates/series/path';

export const SplineSeries = declareSeries('SplineSeries', {
  components: { Path },
  path,
  getPointTransformer,
  createHitTester,
  getDElement,
});
