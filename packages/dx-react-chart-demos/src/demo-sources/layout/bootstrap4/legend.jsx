import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';

import { Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../../../demo-data/data-vizualization';

const RootWithTitle = props => (
  <div>
    <h4 style={{ marginLeft: '1.5rem' }}>
      <span role="img" aria-label="family">👪 Population</span>
    </h4>
    <Legend.Root {...props} />
  </div>
);

const Item = props => (
  <Legend.Item {...props} className="flex-row-reverse" />
);

const Label = props => (
  <Legend.Label {...props} className="text-center w-100" />
);

const stacks = [
  { series: ['Young', 'Adult', 'Old'] },
];

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
            stacks={stacks}
          />
          <Legend
            rootComponent={RootWithTitle}
            itemComponent={Item}
            labelComponent={Label}
          />
        </Chart>
      </div>
    );
  }
}
