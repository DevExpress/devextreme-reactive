import { Chart } from '@devexpress/dx-react-chart';
import { withClassName } from './utils';

const styles = (theme) => {
  const { fontFamily, fontSize, fontWeightLight } = theme.typography;
  return ({
    root: {
      fontFamily,
      fontSize,
      fontWeight: fontWeightLight,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    },
  });
};

export const Root = withClassName(styles)(Chart.Root);
