/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
  Grid,
  LineSeries,
  AreaSeries,
  SplineSeries,
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

          <Legend placeholder="right" />
          <ArgumentAxis position="top" name="year" />
          <ValueAxis name="born" />

          <Grid name="year" />
          <Grid name="born" />

          <LineSeries
            valueField="ru"
            argumentField="year"
            axisName="born"
            name="Russia"
            point={{ size: 10 }}
            style={{ stroke: 'red' }}
            pointStyle={{ fill: 'green' }}
          />
          <SplineSeries
            valueField="ch"
            argumentField="year"
            axisName="born"
            name="China"
            style={{ stroke: 'green' }}
          />
          <AreaSeries
            name="USA"
            valueField="us"
            argumentField="year"
            axisName="born"
            style={{ fill: 'rgba(255,0,0,0.3)', stroke: 'none' }}
            pointStyle={{ fill: 'orange' }}
          />
        </Chart>
      </Card>
    );
  }
}
