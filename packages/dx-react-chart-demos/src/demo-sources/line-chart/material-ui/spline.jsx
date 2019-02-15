import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

import { energyConsumption as data } from '../../../demo-data/data-vizualization';

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ x }) => x)
      .y(({ y }) => y)
      .curve(curveCatmullRom)}
  />
);

const Text = (props) => {
  const { text, subtext } = props;
  return (
    <div>
      <Typography component="h3" variant="h5">
        {text}
      </Typography>
      <Typography variant="subtitle1">{subtext}</Typography>
    </div>
  );
};
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    marginBottom: theme.spacing.unit,
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column-reverse',
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
const demoStyles = () => ({
  chart: {
    paddingRight: '30px',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
});

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
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Oil"
            valueField="oil"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Coal"
            valueField="coal"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
            seriesComponent={Line}
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text="Energy Consumption in 2004"
            subtext="(Millions of Tons, Oil Equivalent)"
            textComponent={Text}
            className={classes.title}
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
