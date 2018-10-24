import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Scale, Animation } from '@devexpress/dx-react-chart';

import { energyConsumption as data } from '../../../demo-data/data-vizualization';

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
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
});
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
        >
          <ArgumentAxis />
          <ValueAxis
            max={2400}
            lineComponent={EmptyComponent}
            tickComponent={EmptyComponent}
          />
          <ValueGrid />

          <BarSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
            stack="a"
          />
          <BarSeries
            name="Oil"
            valueField="oil"
            argumentField="country"
            stack="a"
          />
          <BarSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
            stack="a"
          />
          <BarSeries
            name="Coal"
            valueField="coal"
            argumentField="country"
            stack="a"
          />
          <BarSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
            stack="a"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Energy Consumption in 2004 (Millions of Tons, Oil Equivalent)" className={classes.title} />
          <Stack />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
