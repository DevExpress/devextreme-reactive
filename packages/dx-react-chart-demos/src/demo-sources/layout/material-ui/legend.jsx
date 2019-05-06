import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';

import { Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../../../demo-data/data-vizualization';

const styles = {
  title: {
    marginLeft: '1.5rem',
  },
  item: {
    flexDirection: 'row-reverse',
  },
  label: {
    textAlign: 'center',
  },
};

const RootWithTitle = withStyles(styles)(({ classes, ...restProps }) => (
  <div>
    <h2 className={classes.title}>
      <span role="img" aria-label="family">👪 Population</span>
    </h2>
    <Legend.Root {...restProps} />
  </div>
));

const Item = withStyles(styles)(({ classes, ...restProps }) => (
  <Legend.Item {...restProps} className={classes.item} />
));

const Label = withStyles(styles)(({ classes, ...restProps }) => (
  <Legend.Label {...restProps} className={classes.label} />
));

const stacks = [
  { series: ['Young', 'Adult', 'Old'] },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: ageStructure,
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
            name="👶 Young"
            valueField="young"
            argumentField="state"
          />
          <BarSeries
            name="🧑 Adult"
            valueField="middle"
            argumentField="state"
          />
          <BarSeries
            name="🧓 Old"
            valueField="older"
            argumentField="state"
          />
          <Stack
            stacks={stacks}
          />
          <Legend
            rootComponent={RootWithTitle}
            itemComponent={Item}
            labelComponent={Label}
          />
        </Chart>
      </Paper>
    );
  }
}
