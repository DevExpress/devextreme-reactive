import {
  getLinePointTransformer as getPointTransformer,
  createLineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Line as Path } from '../templates/series/line';

export const LineSeries = declareSeries('LineSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
