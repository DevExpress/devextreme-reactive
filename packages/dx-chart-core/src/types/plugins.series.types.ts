import { PureComputed } from '@devexpress/dx-core';
import {
  Palette, SeriesList, DataItems, ScalesCache,
} from './chart-core.types';

/** @internal */
export type AddSeriesFn = PureComputed<[SeriesList, DataItems, Palette, any, any]>;
/** @internal */
export type ScaleSeriesPointsFn = PureComputed<[SeriesList, ScalesCache]>;
