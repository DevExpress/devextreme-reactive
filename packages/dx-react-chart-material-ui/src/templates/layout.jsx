import { Chart } from '@devexpress/dx-react-chart';
import { withClassName, classes } from './utils';

const styles = ({ theme }) => {
  const { fontFamily, fontSize, fontWeightLight } = theme.typography;
  return ({
    [`&.${classes.root}`]: {
      fontFamily,
      fontSize,
      fontWeight: fontWeightLight,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      boxSizing: 'border-box',
    },
  });
};

export const Root = withClassName(styles)(Chart.Root);
