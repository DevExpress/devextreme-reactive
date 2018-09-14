import { PieSeries as PieSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Slice as Point } from '../templates/series/slice';

export const PieSeries = withComponents({ Point })(PieSeriesBase);
