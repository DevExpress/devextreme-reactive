import * as React from 'react';
import {
  getAreaPointTransformer as getPointTransformer, createAreaHitTester as createHitTester,
} from '@devexpress/dx-chart-core';
import { declareSeries } from '../utils';
import { Area as Path } from '../templates/series/area';
import { AreaSeriesProps } from '../types';

// tslint:disable-next-line: max-line-length
export const AreaSeries: React.ComponentType<AreaSeriesProps> = declareSeries<AreaSeriesProps>('AreaSeries', {
  getPointTransformer,
  createHitTester,
  components: { Path },
});
