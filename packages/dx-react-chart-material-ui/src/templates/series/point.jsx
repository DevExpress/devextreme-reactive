import { ScatterSeries } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

export const Point = withClassName(styles)(ScatterSeries.Point);
