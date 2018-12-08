import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack, Animation } from '@devexpress/dx-react-chart';

import { energyConsumption as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
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
      <div className="card">
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis
            max={2400}
          />

          <BarSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
          />
          <BarSeries
            name="Oil"
            valueField="oil"
            argumentField="country"
          />
          <BarSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
          />
          <BarSeries
            name="Coal"
            valueField="coal"
            argumentField="country"
          />
          <BarSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Energy Consumption in 2004 (Millions of Tons, Oil Equivalent)" />
          <Stack
            stacks={[
              { series: ['Hydro-electric', 'Oil', 'Natural gas', 'Coal', 'Nuclear'] },
            ]}
          />
        </Chart>
      </div>
    );
  }
}
