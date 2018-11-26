import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack, Scale, Animation } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';

import { oilProduction as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const format = scale => scale.tickFormat(null, '%');
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
            tickFormat={format}
            lineComponent={EmptyComponent}
            tickComponent={EmptyComponent}
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
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Oil Production" className="w-100 text-center mb-2" />
          <Stack
            stacks={[
              { series: ['Saudi Arabia', 'USA', 'Iran', 'Mexico', 'Russia'] },
            ]}
            offset={stackOffsetExpand}
          />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
