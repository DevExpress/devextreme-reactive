/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-svg';
import { contributors as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: data.slice(0, 7),
    };
  }
  render() {
    return (
      <Chart
        data={this.state.data}
        width={700}
        height={400}
        series={[
          {
            valueField: 'contributions',
            argumentField: 'login',
            name: 'PieSeries',
          },
        ]}
      >

        <PieSeries
          name="PieSeries"
          style={{ stroke: 'white', fill: '#ff6666' }}
          innerRadius={0}
          outerRadius={0.7}
          cx={700 / 4}
          cy={400 / 2}
        />

        <PieSeries
          name="PieSeries"
          style={{ stroke: 'white', fill: '#9fff80' }}
          innerRadius={0.2}
          outerRadius={0.7}
          cx={(700 / 2) + (700 / 4)}
          cy={400 / 2}
        />
      </Chart>
    );
  }
}
