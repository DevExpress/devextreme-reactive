import {
  getAreaPointTransformer as getPointTransformer, createAreaHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Area as Path } from '../templates/series/area';
import { AreaSeriesProps } from '../types';

export const AreaSeries = declareSeries<AreaSeriesProps>('AreaSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
