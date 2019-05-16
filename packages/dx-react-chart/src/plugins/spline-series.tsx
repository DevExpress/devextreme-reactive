import * as React from 'react';
import {
  getLinePointTransformer as getPointTransformer,
  createSplineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Spline as Path } from '../templates/series/spline';
import { AreaSeriesProps } from '../types';

// tslint:disable-next-line: max-line-length
export const SplineSeries: React.ComponentType<AreaSeriesProps> = declareSeries<AreaSeriesProps>('SplineSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
