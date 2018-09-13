import { AreaSeries as AreaSeriesBase } from './area-series';
import { BarSeries as BarSeriesBase } from './bar-series';
import { LineSeries as LineSeriesBase } from './line-series';
import { PieSeries as PieSeriesBase } from './pie-series';
import { SplineSeries as SplineSeriesBase } from './spline-series';
import { ScatterSeries as ScatterSeriesBase } from './scatter-series';

import * as seriesCompoments from '../templates/series';
import { withComponents } from '../utils';

// Is there a way to import and then export processed components without direct naming?

const withSeriesComponents = withComponents(seriesCompoments);

export const AreaSeries = withSeriesComponents(AreaSeriesBase);
export const BarSeries = withSeriesComponents(BarSeriesBase);
export const LineSeries = withSeriesComponents(LineSeriesBase);
export const PieSeries = withSeriesComponents(PieSeriesBase);
export const SplineSeries = withSeriesComponents(SplineSeriesBase);
export const ScatterSeries = withSeriesComponents(ScatterSeriesBase);
