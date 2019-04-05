import { ZoomAndPan as ZoomAndPanBase } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    fill: theme.palette.type === 'light' ? 'black' : 'white',
  },
});

export const DragBox = withClassName(styles)(ZoomAndPanBase.DragBox);
