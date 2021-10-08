import ListItem from '@mui/material/ListItem';
import { withClassName } from '../utils';

const styles = (theme) => {
  debugger;
  return ({
    root: {
      alignItems: 'center',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  });
};

export const Item = withClassName(styles, { name: 'LegendItem' })(ListItem);
