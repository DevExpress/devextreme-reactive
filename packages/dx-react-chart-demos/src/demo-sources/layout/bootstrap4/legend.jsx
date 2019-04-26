import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-bootstrap4';

import { Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../../../demo-data/data-vizualization';

const RootWithTitle = props => (
  <div className="m-auto">
    <Title.Text className="m-0" text="👪 Population" />
    <Legend.Root {...props} className="flex-row" />
  </div>
);

const Item = props => (
  <Legend.Item {...props} className="m-auto flex-column" />
);

const Label = props => (
  <Legend.Label {...props} className="m-2" />
);

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
      <div className="card">
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
            stacks={[
              { series: ['Young', 'Adult', 'Old'] },
            ]}
          />
          <Legend
            position="top"
            rootComponent={RootWithTitle}
            itemComponent={Item}
            labelComponent={Label}
          />
        </Chart>
      </div>
    );
  }
}
