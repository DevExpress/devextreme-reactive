import { withComponents } from '@devexpress/dx-react-chart';
import * as seriesComponents from '../templates/series';

// Though all *-series.jsx files contain almost similar code they cannot be replaced with
// single file as ts-generation requires presence of those *-series.jsx files.
export const withSeriesComponents = withComponents(seriesComponents);
