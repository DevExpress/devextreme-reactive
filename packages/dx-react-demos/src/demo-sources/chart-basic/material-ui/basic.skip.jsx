import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
  Grid,
  LineSeries,
  AreaSeries,
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
      data: chartData, width, height, series,
    } = this.state;
    return (
      <Paper>
        <Chart data={chartData} width={width} height={height} series={series}>
          <ArgumentAxis position="top" name="year" />
          <ValueAxis name="born" />
          <Legend />

          <Grid name="year" />
          <Grid name="born" />

          <LineSeries
            valueField="ru"
            argumentField="year"
            axisName="born"
            point={{ size: 10 }}
            name="Russia"
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
            valueField="us"
            argumentField="year"
            axisName="born"
            name="USA"
            style={{ fill: 'rgba(255,0,0,0.3)', stroke: 'none' }}
            pointStyle={{ fill: 'orange' }}
          />
        </Chart>
      </Paper>
    );
  }
}
