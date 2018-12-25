// import comment
import * as React from 'react';
// import comment
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-bootstrap4';
// import comment
import { EventTracker } from '@devexpress/dx-react-chart';

// const comment
const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

export default class Demo extends React.PureComponent {
  // const comment
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    // const comment
    const { data: chartData } = this.state;

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
