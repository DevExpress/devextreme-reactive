import { ZoomAndPan as ZoomAndPanBase } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
    opacity: 0.2,
  },
});

export const DragBox = withClassName(styles)(ZoomAndPanBase.DragBox);
