import { PieSeries } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

export const Slice = withClassName(styles)(PieSeries.Point);
