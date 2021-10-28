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
import { stackOffsetExpand } from 'd3-shape';

import { oilProduction as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);

const Label = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

const format = scale => scale.tickFormat(null, '%');

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
          <ValueAxis
            tickFormat={format}
          />

          <BarSeries
            name="Saudi Arabia"
            valueField="saudiArabia"
            argumentField="year"
          />
          <BarSeries
            name="USA"
            valueField="usa"
            argumentField="year"
          />
          <BarSeries
            name="Iran"
            valueField="iran"
            argumentField="year"
          />
          <BarSeries
            name="Mexico"
            valueField="mexico"
            argumentField="year"
          />
          <BarSeries
            name="Russia"
            valueField="russia"
            argumentField="year"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Oil Production" />
          <Stack
            stacks={[
              { series: ['Saudi Arabia', 'USA', 'Iran', 'Mexico', 'Russia'] },
            ]}
            offset={stackOffsetExpand}
          />
        </Chart>
      </Paper>
    );
  }
}
