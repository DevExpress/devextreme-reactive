import { Point as PointBase } from '@devexpress/dx-react-chart';
import { addStyleClassName } from '../utils';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

export const Point = addStyleClassName(styles)(PointBase);
