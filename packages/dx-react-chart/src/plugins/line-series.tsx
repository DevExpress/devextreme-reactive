import * as React from 'react';
import {
  getLinePointTransformer as getPointTransformer,
  createLineHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Line as Path } from '../templates/series/line';
import { AreaSeriesProps } from '../types';

// tslint:disable-next-line: max-line-length
export const LineSeries: React.ComponentType<AreaSeriesProps> = declareSeries<AreaSeriesProps>('LineSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
