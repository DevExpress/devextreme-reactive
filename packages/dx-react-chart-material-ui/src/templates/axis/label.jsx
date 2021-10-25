import { Axis } from '@devexpress/dx-react-chart';
import { withClassName, classes } from '../utils';

const styles = ({ theme }) => {
  const { fontFamily } = theme.typography;
  return ({
    [`&.${classes.root}`]: {
      fill: theme.palette.text.secondary,
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
      backgroundColor: theme.palette.background.paper,
    },
  });
};

export const Label = withClassName(styles)(Axis.Label);
