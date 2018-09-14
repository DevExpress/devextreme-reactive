import { AreaSeries as AreaSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Area } from '../templates/series/area';

export const AreaSeries = withComponents({ Area })(AreaSeriesBase);
