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

import { energyConsumption as data } from '../../../demo-data/data-vizualization';

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
          <ValueAxis max={2400} />
          <Grid />

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
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} />
          <Title text="Energy Consumption in 2004 (Millions of Tons, Oil Equivalent)" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Stack />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}
