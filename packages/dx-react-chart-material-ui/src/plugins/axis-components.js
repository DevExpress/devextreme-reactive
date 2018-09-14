import { withComponents } from '@devexpress/dx-react-chart';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

// Though all *-axis.jsx files contain almost similar code they cannot be replaced with
// single file as ts-generation requires presence of those *-series.jsx files.
export const withAxisComponents = withComponents({
  Root, Tick, Label, Line,
});
