import { ScatterSeries as ScatterSeriesBase, bindSeriesComponents } from '@devexpress/dx-react-chart';
import * as seriesComponents from '../templates/series';

export const ScatterSeries = bindSeriesComponents(ScatterSeriesBase, seriesComponents);
