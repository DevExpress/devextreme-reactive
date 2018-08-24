import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Scale } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';

import { oilProduction as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%',
    }}
  />
);

const Item = props => (
  <Legend.Item
    {...props}
    style={{ width: 'auto' }}
  />
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
          <ValueAxis tickFormat={format} />
          <Grid />

          <BarSeries
            name="Saudi Arabia"
            valueField="saudiArabia"
            argumentField="year"
            stack="one"
          />
          <BarSeries
            name="Usa"
            valueField="usa"
            argumentField="year"
            stack="one"
          />
          <BarSeries
            name="Iran"
            valueField="iran"
            argumentField="year"
            stack="one"
          />
          <BarSeries
            name="Mexico"
            valueField="mexico"
            argumentField="year"
            stack="one"
          />
          <BarSeries
            name="Russia"
            valueField="russia"
            argumentField="year"
            stack="one"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} />
          <Title text="Oil Production" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Stack offset={stackOffsetExpand} />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}
