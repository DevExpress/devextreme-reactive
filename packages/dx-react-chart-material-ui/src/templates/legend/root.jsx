import { List } from '@mui/material';
import { withClassName, classes } from '../utils';

const styles = () => ({
  [`&.${classes.root}`]: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export const Root = withClassName(styles, { name: 'LegendRoot' })(List);
