import * as React from 'react';
import { Paper } from '@mui/material';
import { withClassName, classes } from '../utils';

const styles = ({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(0.5, 1),
  },
});

export const Sheet = withClassName(styles)(props => (
  <Paper {...props} />
));
