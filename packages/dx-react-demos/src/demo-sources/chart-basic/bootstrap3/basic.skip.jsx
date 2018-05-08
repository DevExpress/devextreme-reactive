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
} from '@devexpress/dx-react-chart-svg';
import { born as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      width: 700,
      height: 400,
      series: [
        {
          valueField: 'ru',
          argumentField: 'year',
          axisName: 'born',
          name: 'Russia',
          point: { size: 10 },
        },
        {
          valueField: 'ch',
          argumentField: 'year',
          axisName: 'born',
          name: 'China',
        },
        {
          valueField: 'us',
          argumentField: 'year',
          axisName: 'born',
          name: 'USA',
        },
      ],
    };
  }
  render() {
    const {
      data: chartData, width, height, series,
    } = this.state;
    return (
      <Chart
        data={chartData}
        width={width}
        height={height}
        series={series}
      >

        <Legend placeholder="right" />
        <ArgumentAxis position="top" />
        <ValueAxis name="born" />

        <Grid name="year" />
        <Grid name="born" />

        <LineSeries
          name="Russia"
          style={{ stroke: 'red' }}
          pointStyle={{ fill: 'green' }}
          point={{ size: 10 }}
        />
        <SplineSeries
          name="China"
          style={{ stroke: 'green' }}
        />
        <AreaSeries
          name="USA"
          style={{ fill: 'rgba(255,0,0,0.3)', stroke: 'none' }}
          pointStyle={{ fill: 'orange' }}
        />
      </Chart>
    );
  }
}
