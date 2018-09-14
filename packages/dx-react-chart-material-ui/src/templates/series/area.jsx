import { AreaSeries } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    opacity: 0.5,
  },
});

export const Area = withClassName(styles)(AreaSeries.Path);
