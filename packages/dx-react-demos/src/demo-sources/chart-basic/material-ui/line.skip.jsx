/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Grid,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
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

          <LineSeries
            name="Russia"
            valueField="ru"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'green' }}
            pointStyle={{ fill: 'green' }}
          />
          <LineSeries
            name="China"
            valueField="ch"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'red' }}
            pointStyle={{ fill: 'red' }}
          />
          <LineSeries
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
