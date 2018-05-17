/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Paper from 'material-ui/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Grid,
  Chart,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';
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
      data: chartData, width, height,
    } = this.state;
    return (
      <Paper>
        <Chart
          data={chartData}
          width={width}
          height={height}
        >

          <ArgumentAxis name="year" />
          <ValueAxis name="born" />

          <Grid name="year" />
          <Grid name="born" />

          <SplineSeries
            name="Russia"
            valueField="ru"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'green' }}
            pointStyle={{ fill: 'green' }}
          />
          <SplineSeries
            name="China"
            valueField="ch"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'red' }}
            pointStyle={{ fill: 'red' }}
          />
          <SplineSeries
            name="USA"
            valueField="us"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'blue' }}
            pointStyle={{ fill: 'blue' }}
          />
        </Chart>
      </Paper>
    );
  }
}
