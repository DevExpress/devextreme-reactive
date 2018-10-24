import { Chart } from '@devexpress/dx-react-chart';
import { withClassName } from './utils';

const styles = (theme) => {
  const { fontFamily } = theme.typography;
  return ({
    root: {
      fill: theme.palette.text.secondary,
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
    },
  });
};

export const Label = withClassName(styles)(Chart.Label);
