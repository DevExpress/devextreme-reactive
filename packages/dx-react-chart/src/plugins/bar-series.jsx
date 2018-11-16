import {
  getBarPointTransformer as getPointTransformer,
  createBarHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { BarCollection as Path } from '../templates/series/bar-collection';
import { Bar as Point } from '../templates/series/bar';

export const BarSeries = declareSeries('BarSeries', {
  components: { Path, Point },
  getPointTransformer,
  createHitTester,
});

BarSeries.defaultProps = {
  barWidth: 0.9,
};
