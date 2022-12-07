import { ListItem } from '@mui/material';
import { withClassName, classes } from '../utils';

const styles = ({ theme }) => ({
  [`&.${classes.root}`]: {
    alignItems: 'center',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
});

export const Item = withClassName(styles, { name: 'LegendItem' })(ListItem);
