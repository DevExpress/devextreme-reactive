import * as React from 'react';
import { Typography } from '@mui/material';
import { withClassName, classes } from '../utils';

const styles = () => ({
  [`&.${classes.root}`]: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '20px',
  },
});

export const Text = withClassName(styles, { name: 'Title' })(
  ({ text, ...restProps }) => <Typography component="h3" variant="h5" {...restProps}>{text}</Typography>,
);
