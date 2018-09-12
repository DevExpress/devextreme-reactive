import { AreaSeries as AreaSeriesBase } from './area-series';
import { BarSeries as BarSeriesBase } from './bar-series';
import { LineSeries as LineSeriesBase } from './line-series';
import { PieSeries as PieSeriesBase } from './pie-series';
import { SplineSeries as SplineSeriesBase } from './spline-series';
import { ScatterSeries as ScatterSeriesBase } from './scatter-series';

import * as seriesCompoments from '../templates/series';
import { bindSeriesComponents } from '../utils';

// Is there a way to import and then export processed components without direct naming?

const withComponents = bindSeriesComponents(seriesCompoments);

export const AreaSeries = withComponents(AreaSeriesBase);
export const BarSeries = withComponents(BarSeriesBase);
export const LineSeries = withComponents(LineSeriesBase);
export const PieSeries = withComponents(PieSeriesBase);
export const SplineSeries = withComponents(SplineSeriesBase);
export const ScatterSeries = withComponents(ScatterSeriesBase);
