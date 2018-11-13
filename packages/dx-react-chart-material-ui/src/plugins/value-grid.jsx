import { withComponents } from '@devexpress/dx-react-core';
import { ValueGrid as ValueGridBase } from '@devexpress/dx-react-chart';
import { Line } from '../templates/grid/line';

export const ValueGrid = withComponents({ Line })(ValueGridBase);
