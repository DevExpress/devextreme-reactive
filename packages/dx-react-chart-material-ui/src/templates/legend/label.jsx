import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { withClassName } from '../utils';

const styles = () => ({
  root: {
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export const Label = withClassName(styles, { name: 'LegendLabel' })(
  ({ text, ...restProps }) => <ListItemText {...restProps}>{text}</ListItemText>,
);
