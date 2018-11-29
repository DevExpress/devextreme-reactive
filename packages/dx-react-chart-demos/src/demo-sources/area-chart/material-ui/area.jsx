import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Scale, Animation } from '@devexpress/dx-react-chart';
import { scalePoint } from 'd3-scale';

const data = [
  { year: '2010', android: 67225, ios: 46598 },
  { year: '2011', android: 179873, ios: 90560 },
  { year: '2012', android: 310088, ios: 118848 },
  { year: '2015', android: 539318, ios: 189924 },
];

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing.unit,
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});
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

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

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
          <ValueAxis />

          <AreaSeries
            name="Android"
            valueField="android"
            argumentField="year"
          />
          <AreaSeries
            name="iOS"
            valueField="ios"
            argumentField="year"
          />
          <Animation />
          <Scale extensions={[{ type: 'band', constructor: scalePoint }]} />
          <Legend
            position="bottom"
            rootComponent={Root}
            itemComponent={Item}
            labelComponent={Label}
          />
          <Title
            text="Worldwide Sales to End Users by OS"
            className={classes.title}
          />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
