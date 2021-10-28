import { Chart } from '@devexpress/dx-react-chart';
import { withClassName, classes } from './utils';

const styles = ({ theme }) => {
  const { fontFamily } = theme.typography;
  return ({
    [`&.${classes.root}`]: {
      fill: theme.palette.text.secondary,
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
    },
  });
};

export const Label = withClassName(styles)(Chart.Label);
