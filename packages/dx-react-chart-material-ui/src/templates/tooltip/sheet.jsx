import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    padding: theme.spacing(0.5, 1),
  },
});

export const Sheet = withClassName(styles)(props => (
  <Paper {...props} />
));
