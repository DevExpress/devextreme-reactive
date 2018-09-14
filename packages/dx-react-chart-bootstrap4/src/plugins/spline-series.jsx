import { SplineSeries as SplineSeriesBase, withComponents } from '@devexpress/dx-react-chart';
import { Path } from '../templates/series/path';

export const SplineSeries = withComponents({ Path })(SplineSeriesBase);
