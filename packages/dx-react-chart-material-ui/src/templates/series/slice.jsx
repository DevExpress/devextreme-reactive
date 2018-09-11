import { Slice as SliceBase } from '@devexpress/dx-react-chart';
import { addStyleClassName } from '../utils';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

export const Slice = addStyleClassName(styles)(SliceBase);
