/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Card } from 'reactstrap';
import { born as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
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

          <ArgumentAxis name="year" />
          <ValueAxis name="born" />

          <ScatterSeries
            name="Russia"
            valueField="ru"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'red', fill: 'white' }}
          />
          <ScatterSeries
            name="China"
            valueField="ch"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'orange', fill: 'blue' }}
          />
        </Chart>
      </Card>
    );
  }
}
