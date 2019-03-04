import * as React from 'react';
import {
  getPiePointTransformer as getPointTransformer,
  createPieHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { PointCollection as Path } from '../templates/series/point-collection';
import { Slice as Point } from '../templates/series/slice';
import { PieSeriesProps } from '../types';

// tslint:disable-next-line: max-line-length
export const PieSeries: React.ComponentType<PieSeriesProps> = declareSeries<PieSeriesProps>('PieSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path, Point },
});

PieSeries.defaultProps = {
  innerRadius: 0,
  outerRadius: 1,
};
