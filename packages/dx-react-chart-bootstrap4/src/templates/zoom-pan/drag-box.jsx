import { ZoomAndPan } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

export const DragBox = withClassName(
  'bg-secondary',
)(ZoomAndPan.DragBox);
