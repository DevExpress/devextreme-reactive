import { LineSeries } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    fill: 'none',
    strokeWidth: '2px',
  },
});

export const Path = withClassName(styles)(LineSeries.Path);
