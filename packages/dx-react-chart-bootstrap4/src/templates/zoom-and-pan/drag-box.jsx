import { ZoomAndPan } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

export const DragBox = withClassName(
  'bg-secondary', 'dx-c-bs4-rect-opacity',
)(ZoomAndPan.DragBox);
