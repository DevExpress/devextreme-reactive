// BLOCK:imports
import { styled } from '@mui/material/styles';
// BLOCK:imports

// BLOCK:body
const PREFIX = 'Demo';

const classes = {
  chart: `${PREFIX}-chart`,
};

const StyledChartRoot = styled(Chart.Root)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '20px',
  },
}));

const ChartRoot = props => (
  <StyledChartRoot {...props} className={classes.chart} />
);
const LegendRoot = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const LegendLabel = props => (
  <Legend.Label {...props} sx={{ pt: 1 }} />
);
const LegendItem = props => (
  <Legend.Item {...props} sx={{ flexDirection: 'column' }} />
);
// BLOCK:body
