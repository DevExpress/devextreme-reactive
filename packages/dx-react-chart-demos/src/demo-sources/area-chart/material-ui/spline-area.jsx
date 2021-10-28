import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const data = [
  { month: 'Jan', appStore: 101, googlePlay: 13 },
  { month: 'Feb', appStore: 89, googlePlay: 15 },
  { month: 'Mar', appStore: 107, googlePlay: 20 },
  { month: 'Apr', appStore: 113, googlePlay: 17 },
  { month: 'May', appStore: 105, googlePlay: 21 },
  { month: 'Jun', appStore: 91, googlePlay: 22 },
  { month: 'Jul', appStore: 110, googlePlay: 23 },
  { month: 'Aug', appStore: 111, googlePlay: 25 },
  { month: 'Sep', appStore: 112, googlePlay: 27 },
  { month: 'Oct', appStore: 111, googlePlay: 30 },
  { month: 'Nov', appStore: 120, googlePlay: 35 },
  { month: 'Dec', appStore: 160, googlePlay: 45 },
];
const PREFIX = 'Demo';

const classes = {
  chart: `${PREFIX}-chart`,
};
const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);
const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '20px',
  },
}));

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
      .curve(curveCatmullRom)}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    return (
      <Paper>
        <StyledChart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <AreaSeries
            name="App Store"
            valueField="appStore"
            argumentField="month"
            seriesComponent={Area}
          />
          <AreaSeries
            name="Google Play"
            valueField="googlePlay"
            argumentField="month"
            seriesComponent={Area}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="iOS App Store vs Google Play Revenue in 2012" />
        </StyledChart>
      </Paper>
    );
  }
}
