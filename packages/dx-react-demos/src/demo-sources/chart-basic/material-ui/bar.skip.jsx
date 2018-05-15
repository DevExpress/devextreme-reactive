/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { contributors as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: data.slice(0, 7),
      width: 700,
      height: 400,
      axes: [{ name: 'commits', min: 0 }, { name: 'login', type: 'band' }],
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
      data: chartData, width, height, series, axes,
    } = this.state;
    return (
      <Paper>
        <Chart
          data={chartData}
          width={width}
          height={height}
          axes={axes}
          series={series}
        >

          <ArgumentAxis />
          <ValueAxis name="commits" />

          <BarSeries
            name="BarSeries"
            style={{ stroke: 'none', fill: 'darkblue' }}
          />
        </Chart>
      </Paper>
    );
  }
}
