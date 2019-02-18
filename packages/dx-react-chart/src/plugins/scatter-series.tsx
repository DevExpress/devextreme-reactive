import {
  getScatterPointTransformer as getPointTransformer,
  createScatterHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { PointCollection as Path } from '../templates/series/point-collection';
import { Point } from '../templates/series/point';
import { ScatterSeriesProps } from '../types';

export const ScatterSeries: React.ComponentType<
  ScatterSeriesProps
> = declareSeries('ScatterSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path, Point },
});

ScatterSeries.defaultProps = {
  point: { size: 7 },
};
