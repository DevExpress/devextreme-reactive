import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation, EventTracker } from '@devexpress/dx-react-chart';

import { olimpicMedals as data } from '../../../demo-data/data-vizualization';

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

const sheetStyles = {
  paper: {
    background: 'red',
  },
};

const arrowStyles = {
  arrow: { '&::after': { backgroundColor: 'red' } },
};

const Arrow = withStyles(arrowStyles)(({ classes, ...restProps }) => (
  <Tooltip.Arrow className={classes.arrow} {...restProps} />
));

const SheetBase = ({ classes, ...restProps }) => (
  <Tooltip.Sheet
    className={classes.paper}
    {...restProps}
  />
);
const Sheet = withStyles(sheetStyles)(SheetBase);

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
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="country"
            color="#ffd700"
          />
          <BarSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="country"
            color="#c0c0c0"
          />
          <BarSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="country"
            color="#cd7f32"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Olimpic Medals in 2008" />
          <Stack />
          <EventTracker />
          <Tooltip sheetComponent={Sheet} arrowComponent={Arrow} />
        </Chart>
      </Paper>
    );
  }
}
