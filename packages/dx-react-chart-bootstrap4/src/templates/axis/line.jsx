import { Axis } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

export const Line = withClassName(
  'dx-c-bs4-stroke-current-color', 'dx-c-bs4-axis-opacity',
)(Axis.Line);
