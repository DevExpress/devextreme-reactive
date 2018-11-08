import {
  getAreaPointTransformer as getPointTransformer,
  createScatterHitTester as createHitTester,
  getPointDElement as getDElement,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { PointCollection as Path } from '../templates/series/point-collection';
import { Point } from '../templates/series/point';

export const ScatterSeries = declareSeries('ScatterSeries', {
  components: { Path, Point },
  getPointTransformer,
  createHitTester,
  getDElement,
});
