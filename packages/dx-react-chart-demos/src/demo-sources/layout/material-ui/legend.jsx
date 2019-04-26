import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';

import { Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../../../demo-data/data-vizualization';

const styles = {
  root: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    margin: '0px',
  },
  legendRoot: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'column',
    margin: 'auto',
  },
  label: {
    margin: '10px',
  },
};

const RootWithTitle = withStyles(styles)(({ classes, ...restProps }) => (
  <div className={classes.root}>
    <Title.Text className={classes.title} text="👪 Population" />
    <Legend.Root {...restProps} className={classes.legendRoot} />
  </div>
));

const Item = withStyles(styles)(({ classes, ...restProps }) => (
  <Legend.Item {...restProps} className={classes.item} />
));

const Label = withStyles(styles)(({ classes, ...restProps }) => (
  <Legend.Label {...restProps} className={classes.label} />
));

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
            stacks={[
              { series: ['Young', 'Adult', 'Old'] },
            ]}
          />
          <Legend
            position="top"
            rootComponent={RootWithTitle}
            itemComponent={Item}
            labelComponent={Label}
          />
        </Chart>
      </Paper>
    );
  }
}
