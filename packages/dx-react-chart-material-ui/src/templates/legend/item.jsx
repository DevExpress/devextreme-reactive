import ListItem from '@material-ui/core/ListItem';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 0.5,
    paddingBottom: theme.spacing.unit * 0.5,
  },
});

export const Item = withClassName(styles, { name: 'LegendItem' })(ListItem);
