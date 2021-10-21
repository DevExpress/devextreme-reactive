import * as React from 'react';
import Typography from '@mui/material/Typography';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '20px',
  },
});

export const Text = withClassName(styles, { name: 'Title' })(
  ({ text, ...restProps }) => <Typography component="h3" variant="h5" {...restProps}>{text}</Typography>,
);
