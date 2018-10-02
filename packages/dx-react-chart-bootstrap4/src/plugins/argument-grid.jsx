import { ArgumentGrid as ArgumentGridBase, withComponents } from '@devexpress/dx-react-chart';
import { Line } from '../templates/grid/line';

export const ArgumentGrid = withComponents({ Line })(ArgumentGridBase);
