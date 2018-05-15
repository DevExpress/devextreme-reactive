/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Card } from 'reactstrap';
import { contributors as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: data.slice(0, 7),
      width: 700,
      height: 400,
      series: [
        {
          valueField: 'contributions',
          argumentField: 'login',
          axisName: 'commits',
          name: 'BarSeries',
        },
      ],
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

          <ArgumentAxis name="login" type="band" />
          <ValueAxis name="commits" min={0} />

          <BarSeries
            name="BarSeries"
            style={{ stroke: 'none', fill: 'darkblue' }}
          />
        </Chart>
      </Card>
    );
  }
}
