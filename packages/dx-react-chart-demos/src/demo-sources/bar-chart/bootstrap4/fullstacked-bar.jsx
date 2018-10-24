import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  ValueGrid,
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
          <ValueGrid />

          <BarSeries
            name="Saudi Arabia"
            valueField="saudiArabia"
            argumentField="year"
            stack="one"
          />
          <BarSeries
            name="USA"
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
          <Animation />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Oil Production" className="w-100 text-center mb-2" />
          <Stack offset={stackOffsetExpand} />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
