import { ZoomAndPan as ZoomAndPanBase } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    fill: theme.palette.type === 'light' ? 'black' : 'white',
    opacity: 0.3,
  },
});

export const DragBox = withClassName(styles)(ZoomAndPanBase.DragBox);
