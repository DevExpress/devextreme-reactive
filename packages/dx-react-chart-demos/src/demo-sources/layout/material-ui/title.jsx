import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import { Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../../../demo-data/data-vizualization';

const PREFIX = 'Demo';

const classes = {
  titleText: `${PREFIX}-titleText`,
};

const StyledText = styled(Title.Text)(() => ({
  [`&.${classes.titleText}`]: {
    textAlign: 'left',
  },
}));

const TextComponent = props => (
  <StyledText {...props} className={classes.titleText} />
);

const stacks = [
  { series: ['👶 Young', '🧑 Adult', '🧓 Old'] },
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
          <Title text="👪 Population" textComponent={TextComponent} />
          <Legend />
        </Chart>
      </Paper>
    );
  }
}
