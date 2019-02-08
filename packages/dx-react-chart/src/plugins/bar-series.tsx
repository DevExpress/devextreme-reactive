import {
  getBarPointTransformer as getPointTransformer,
  createBarHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { PointCollection as Path } from '../templates/series/point-collection';
import { Bar as Point } from '../templates/series/bar';

export const BarSeries = declareSeries('BarSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path, Point },
});

BarSeries.defaultProps = {
  barWidth: 0.9,
};
