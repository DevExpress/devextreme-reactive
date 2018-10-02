import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Scale } from '@devexpress/dx-react-chart';
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
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
});

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ x }) => x)
      .y1(({ y }) => y)
      .y0(({ y1 }) => y1)
      .curve(curveCatmullRom)}
  />
);
const EmptyComponent = () => null;

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;
    return (
      <Paper>
        <Chart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis />
          <ValueAxis lineComponent={EmptyComponent} tickSize={0} />

          <ValueGrid />

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
          <Scale extensions={[{ type: 'band', constructor: scalePoint }]} />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="iOS App Store vs Google Play Revenue in 2012" className={classes.title} />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
