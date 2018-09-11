import { Area as AreaBase } from '@devexpress/dx-react-chart';
import { addStyleClassName } from '../utils';

const styles = () => ({
  root: {
    opacity: 0.5,
  },
});

export const Area = addStyleClassName(styles)(AreaBase);
