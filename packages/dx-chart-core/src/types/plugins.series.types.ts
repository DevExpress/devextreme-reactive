import { PureComputed } from '@devexpress/dx-core';
import {
  Palette, SeriesList, DataItems, ScalesCache,
} from './chart-core.types';

export type AddSeries = PureComputed<[SeriesList, DataItems, Palette, any, any]>;
export type ScaleSeriesPoints = PureComputed<[SeriesList, ScalesCache]>;
