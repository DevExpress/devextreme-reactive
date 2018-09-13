import { Line as LineBase } from '@devexpress/dx-react-chart';
import { withClassName, getBorderColor } from '../utils';

const styles = theme => ({
  root: {
    stroke: getBorderColor(theme),
    shapeRendering: 'crispEdges',
  },
});

export const Line = withClassName(styles)(LineBase);
