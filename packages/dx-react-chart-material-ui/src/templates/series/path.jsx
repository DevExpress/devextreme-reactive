import { Path as PathBase } from '@devexpress/dx-react-chart';
import { addStyleClassName } from '../utils';

const styles = () => ({
  root: {
    fill: 'none',
    strokeWidth: '2px',
  },
});

export const Path = addStyleClassName(styles)(PathBase);
