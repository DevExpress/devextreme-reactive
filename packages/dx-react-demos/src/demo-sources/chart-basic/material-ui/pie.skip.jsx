/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
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
      <Paper>
        <Chart
          data={chartData}
          width={width}
          height={height}
          series={series}
        >

          <PieSeries
            valueField="contributions"
            argumentField="login"
            name="PieSeries"
            style={{ stroke: 'white', fill: '#ff6666' }}
          />
        </Chart>
      </Paper>
    );
  }
}
