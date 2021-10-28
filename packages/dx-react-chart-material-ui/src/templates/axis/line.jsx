import { Axis } from '@devexpress/dx-react-chart';
import { withClassName, getBorderColor, classes } from '../utils';

const styles = ({ theme }) => ({
  [`&.${classes.root}`]: {
    stroke: getBorderColor(theme),
    shapeRendering: 'crispEdges',
  },
});

export const Line = withClassName(styles)(Axis.Line);
