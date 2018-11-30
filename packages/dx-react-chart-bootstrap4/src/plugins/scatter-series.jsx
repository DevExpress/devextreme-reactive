import { withComponents } from '@devexpress/dx-react-core';
import { ScatterSeries as ScatterSeriesBase } from '@devexpress/dx-react-chart';
import { Point } from '../templates/series/point';

export const ScatterSeries = withComponents({ Point })(ScatterSeriesBase);
