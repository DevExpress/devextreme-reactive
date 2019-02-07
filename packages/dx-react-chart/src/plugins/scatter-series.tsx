import {
  getScatterPointTransformer as getPointTransformer,
  createScatterHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { PointCollection as Path } from '../templates/series/point-collection';
import { Point } from '../templates/series/point';

export const ScatterSeries = declareSeries('ScatterSeries', {
  components: { Path, Point },
  getPointTransformer,
  createHitTester,
});

ScatterSeries.defaultProps = {
  point: { size: 7 },
};
