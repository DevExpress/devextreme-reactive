import * as React from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-bootstrap4';
import { EventTracker } from '@devexpress/dx-react-chart';

const data = [ // comment
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

export default class Demo extends React.PureComponent {
  constructor(props) { // comment
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state; // comment

    return (
      <div className="card">
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title
            text="World population (billion)"
          />
          <EventTracker />
          <Tooltip />
        </Chart>
      </div>
    );
  }
}
