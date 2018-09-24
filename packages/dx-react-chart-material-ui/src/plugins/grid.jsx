import { Grid as GridBase, withComponents } from '@devexpress/dx-react-chart';
import { Line } from '../templates/grid/line';

export const Grid = withComponents({ Line })(GridBase);
