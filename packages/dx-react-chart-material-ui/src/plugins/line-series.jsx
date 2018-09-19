import { LineSeries as LineSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Path } from '../templates/series/path';

export const LineSeries = withComponents({ Path })(LineSeriesBase);
