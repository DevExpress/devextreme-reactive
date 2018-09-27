import { Axis } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

export const Label = withClassName(
  'dx-c-bs4-fill-current-color', 'dx-c-bs4-axis-label', 'text-muted',
)(Axis.Label);
