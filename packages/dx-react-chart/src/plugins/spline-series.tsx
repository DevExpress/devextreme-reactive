import {
  getLinePointTransformer as getPointTransformer,
  createSplineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Spline as Path } from '../templates/series/spline';
import { AreaSeriesProps } from '../types';

export const SplineSeries: React.ComponentType<AreaSeriesProps> = declareSeries('SplineSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
