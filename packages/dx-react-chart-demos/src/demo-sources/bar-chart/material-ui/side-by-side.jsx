import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';

import { olimpicMedals as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

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
        </Chart>
      </Paper>
    );
  }
}
