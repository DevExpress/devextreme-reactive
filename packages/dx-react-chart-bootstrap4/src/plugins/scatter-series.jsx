import { ScatterSeries as ScatterSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Point } from '../templates/series/point';

export const ScatterSeries = withComponents({ Point })(ScatterSeriesBase);
