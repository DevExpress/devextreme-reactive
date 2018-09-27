import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack, Scale } from '@devexpress/dx-react-chart';

import { energyConsumption as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);
const EmptyComponent = () => null;

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
      <Card>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis
            max={2400}
            lineComponent={EmptyComponent}
            tickSize={0}
          />
          <Grid />

          <BarSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
            stack="one"
          />
          <BarSeries
            name="Oil"
            valueField="oil"
            argumentField="country"
            stack="one"
          />
          <BarSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
            stack="one"
          />
          <BarSeries
            name="Coal"
            valueField="coal"
            argumentField="country"
            stack="one"
          />
          <BarSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
            stack="one"
          />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Energy Consumption in 2004 (Millions of Tons, Oil Equivalent)" className="w-100 text-center mb-2" />
          <Stack />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
