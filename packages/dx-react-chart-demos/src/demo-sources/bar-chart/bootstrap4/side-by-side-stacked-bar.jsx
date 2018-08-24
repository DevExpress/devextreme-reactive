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

import { population as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      justifyContent: 'center',
      width: '100%',
    }}
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
      <Card>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />
          <Grid />

          <BarSeries
            name="Male: 0-14"
            valueField="maleyoung"
            argumentField="state"
            stack="male"
          />
          <BarSeries
            name="Male: 15-64"
            valueField="malemiddle"
            argumentField="state"
            stack="male"
          />
          <BarSeries
            name="Male: 65 and older"
            valueField="maleolder"
            argumentField="state"
            stack="male"
          />
          <BarSeries
            name="Female: 0-14"
            valueField="femaleyoung"
            argumentField="state"
            stack="female"
          />
          <BarSeries
            name="Female: 15-64"
            valueField="femalemiddle"
            argumentField="state"
            stack="female"
          />
          <BarSeries
            name="Female: 65 and older"
            valueField="femaleolder"
            argumentField="state"
            stack="female"
          />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Population: Age Structure" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Stack />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
