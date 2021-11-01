import { ZoomAndPan as ZoomAndPanBase } from '@devexpress/dx-react-chart';
import { withClassName, classes } from '../utils';

const styles = ({ theme }) => ({
  [`&.${classes.root}`]: {
    fill: theme.palette.primary.main,
    opacity: 0.2,
  },
});

export const DragBox = withClassName(styles)(ZoomAndPanBase.DragBox);
