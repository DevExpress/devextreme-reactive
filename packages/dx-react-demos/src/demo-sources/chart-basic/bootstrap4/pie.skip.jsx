/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Card } from 'reactstrap';
import { contributors as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: data.slice(0, 7),
      series: [
        {
          valueField: 'contributions',
          argumentField: 'login',
          name: 'PieSeries',
        },
      ],
      width: 700,
      height: 400,
    };
  }
  render() {
    const {
      data: chartData, width, height, series,
    } = this.state;
    return (
      <Card>
        <Chart
          data={chartData}
          width={width}
          height={height}
          series={series}
        >

          <PieSeries
            name="PieSeries"
            style={{ stroke: 'white', fill: '#ff6666' }}
          />
        </Chart>
      </Card>
    );
  }
}
