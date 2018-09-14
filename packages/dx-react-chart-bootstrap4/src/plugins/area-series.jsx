import { AreaSeries as AreaSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Area as Path } from '../templates/series/area';

export const AreaSeries = withComponents({ Path })(AreaSeriesBase);
