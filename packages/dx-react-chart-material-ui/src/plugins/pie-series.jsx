import { PieSeries as PieSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Slice } from '../templates/series/slice';

export const PieSeries = withComponents({ Slice })(PieSeriesBase);
