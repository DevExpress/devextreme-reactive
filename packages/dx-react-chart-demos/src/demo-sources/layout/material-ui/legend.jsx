import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';

import { Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../../../demo-data/data-vizualization';

const PREFIX = 'Demo';

const classes = {
  title: `${PREFIX}-title`,
};

const StyledH2 = styled('h2')(({ theme }) => ({
  [`&.${classes.title}`]: {
    marginLeft: theme.spacing(2),
    marginBottom: 0,
    marginRight: theme.spacing(2),
  },
}));

const RootWithTitle = props => (
  <div>
    <StyledH2 className={classes.title}>
      <span role="img" aria-label="family">👪 Population</span>
    </StyledH2>
    <Legend.Root {...props} />
  </div>
);

const Item = props => (
  <Legend.Item {...props} sx={{ flexDirection: 'row-reverse' }} />
);

const Label = props => (
  <Legend.Label {...props} sx={{ textAlign: 'right' }} />
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
