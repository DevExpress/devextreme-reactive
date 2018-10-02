import { ValueGrid as ValueGridBase, withComponents } from '@devexpress/dx-react-chart';
import { Line } from '../templates/grid/line';

export const ValueGrid = withComponents({ Line })(ValueGridBase);
