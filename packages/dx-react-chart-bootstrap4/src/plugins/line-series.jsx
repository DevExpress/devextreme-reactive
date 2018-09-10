import { LineSeries as LineSeriesBase, bindSeriesComponents } from '@devexpress/dx-react-chart';
import * as seriesComponents from '../templates/series';

export const LineSeries = bindSeriesComponents(LineSeriesBase, seriesComponents);
