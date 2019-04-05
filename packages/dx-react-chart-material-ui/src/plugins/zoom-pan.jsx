import { ZoomAndPan as ZoomAndPanBase } from '@devexpress/dx-react-chart';
import { withComponents } from '@devexpress/dx-react-core';
import { DragBox } from '../templates/zoom-pan/drag-box';

export const ZoomAndPan = withComponents({ DragBox })(ZoomAndPanBase);
