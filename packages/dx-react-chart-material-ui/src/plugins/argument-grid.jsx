import { withComponents } from '@devexpress/dx-react-core';
import { ArgumentGrid as ArgumentGridBase } from '@devexpress/dx-react-chart';
import { Line } from '../templates/grid/line';

export const ArgumentGrid = withComponents({ Line })(ArgumentGridBase);
