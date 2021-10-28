import { Axis } from '@devexpress/dx-react-chart';
import { withClassName, classes } from '../utils';

const styles = () => ({
  [`&.${classes.root}`]: {
    shapeRendering: 'crispEdges',
  },
});

export const Root = withClassName(styles)(Axis.Root);
