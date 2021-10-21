import * as React from 'react';
import Typography from '@mui/material/Typography';
import { withClassName } from '../utils';

const styles = theme => ({
  root: {
    fontSize: 14,
    padding: theme.spacing(0.5),
  },
});

export const Content = withClassName(styles, { name: 'TooltipContent' })(
  ({ text, targetItem, ...restProps }) => <Typography {...restProps}>{text}</Typography>,
);
