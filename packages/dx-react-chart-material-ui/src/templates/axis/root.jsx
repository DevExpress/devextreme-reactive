import { Axis } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    shapeRendering: 'crispEdges',
  },
});

export const Root = withClassName(styles)(Axis.Root);
