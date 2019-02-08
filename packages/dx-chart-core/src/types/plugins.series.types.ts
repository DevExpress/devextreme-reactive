import { PureComputed } from '@devexpress/dx-core';
import {
  Palette, SeriesList, DataItems, ScalesCache,
} from './chart-core.types';

export type AddSeriesFn = PureComputed<[SeriesList, DataItems, Palette, any, any]>;
export type ScaleSeriesPointsFn = PureComputed<[SeriesList, ScalesCache]>;
