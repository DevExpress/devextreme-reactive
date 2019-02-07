import {
  getAreaPointTransformer as getPointTransformer, createAreaHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Area as Path } from '../templates/series/area';

export const AreaSeries = declareSeries('AreaSeries', {
  components: { Path },
  getPointTransformer,
  createHitTester,
});
