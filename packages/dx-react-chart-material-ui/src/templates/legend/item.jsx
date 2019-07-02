import ListItem from '@material-ui/core/ListItem';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    alignItems: 'center',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
});

export const Item = withClassName(styles, { name: 'LegendItem' })(ListItem);
