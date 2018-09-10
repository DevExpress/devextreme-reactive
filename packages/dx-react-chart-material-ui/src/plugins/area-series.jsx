import { AreaSeries as AreaSeriesBase, bindSeriesComponents } from '@devexpress/dx-react-chart';
import * as seriesComponents from '../templates/series';

export const AreaSeries = bindSeriesComponents(AreaSeriesBase, seriesComponents);
