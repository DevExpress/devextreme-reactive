import {
  getLinePointTransformer as getPointTransformer,
  createLineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Line as Path } from '../templates/series/line';
import { AreaSeriesProps } from '../types';

export const LineSeries = declareSeries<AreaSeriesProps>('LineSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
