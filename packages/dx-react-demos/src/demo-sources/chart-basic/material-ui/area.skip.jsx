/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Paper from 'material-ui/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Grid,
  Chart,
  AreaSeries,
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

          <AreaSeries
            name="Russia"
            valueField="ru"
            argumentField="year"
            axisName="born"
            style={{ fill: '#47d147', stroke: 'none', opacity: 0.5 }}
            pointStyle={{ fill: '#47d147' }}
          />
          <AreaSeries
            name="China"
            valueField="ch"
            argumentField="year"
            axisName="born"
            style={{ fill: '#ff3333', stroke: 'none', opacity: 0.5 }}
            pointStyle={{ fill: '#ff3333' }}
          />
          <AreaSeries
            name="USA"
            valueField="us"
            argumentField="year"
            axisName="born"
            style={{ fill: '#0099ff', stroke: 'none', opacity: 0.5 }}
            pointStyle={{ fill: '#0099ff' }}
          />
        </Chart>
      </Paper>
    );
  }
}
