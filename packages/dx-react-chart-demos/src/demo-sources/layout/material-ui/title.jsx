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
  titleText: {
    textAlign: 'left',
  },
};

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.titleText} />
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
          <Title text="👪 Population" textComponent={TextComponent} />
          <Legend />
        </Chart>
      </Paper>
    );
  }
}
