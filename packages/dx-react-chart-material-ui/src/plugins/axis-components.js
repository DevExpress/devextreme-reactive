import { withComponents } from '@devexpress/dx-react-chart';
import * as axisComponents from '../templates/axis';

// Though all *-axis.jsx files contain almost similar code they cannot be replaced with
// single file as ts-generation requires presence of those *-series.jsx files.
export const withAxisComponents = withComponents(axisComponents);
