import {
  dLine as path,
  getAreaPointTransformer as getPointTransformer,
  createLineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Path } from '../templates/series/path';

export const LineSeries = declareSeries('LineSeries', {
  components: { Path },
  path,
  getPointTransformer,
  createHitTester,
});
