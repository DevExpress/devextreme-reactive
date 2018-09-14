import List from '@material-ui/core/List';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export const Root = withClassName(styles, { name: 'LegendRoot' })(List);
