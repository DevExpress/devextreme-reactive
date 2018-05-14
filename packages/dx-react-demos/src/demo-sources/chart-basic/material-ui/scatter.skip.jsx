/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Paper from 'material-ui/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
} from '@devexpress/dx-react-chart-material-ui';
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
        },
        {
          valueField: 'ch',
          argumentField: 'year',
          axisName: 'born',
          name: 'China',
        },
      ],
    };
  }
  render() {
    const {
      data: chartData, width, height, series,
    } = this.state;
    return (
      <Paper>
        <Chart
          data={chartData}
          width={width}
          height={height}
          series={series}
        >

          <ArgumentAxis />
          <ValueAxis name="born" />

          <ScatterSeries
            name="Russia"
            style={{ stroke: 'red', fill: 'white' }}
          />
          <ScatterSeries
            name="China"
            style={{ stroke: 'orange', fill: 'blue' }}
          />
        </Chart>
      </Paper>
    );
  }
}
