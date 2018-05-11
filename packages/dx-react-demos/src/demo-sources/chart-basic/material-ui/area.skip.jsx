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
      <Paper>
        <Chart
          data={chartData}
          width={width}
          height={height}
          series={series}
        >

          <ArgumentAxis />
          <ValueAxis name="born" />

          <Grid name="year" />
          <Grid name="born" />

          <AreaSeries
            name="Russia"
            style={{ fill: '#47d147', stroke: 'none', opacity: 0.5 }}
            pointStyle={{ fill: '#47d147' }}
          />
          <AreaSeries
            name="China"
            style={{ fill: '#ff3333', stroke: 'none', opacity: 0.5 }}
            pointStyle={{ fill: '#ff3333' }}
          />
          <AreaSeries
            name="USA"
            style={{ fill: '#0099ff', stroke: 'none', opacity: 0.5 }}
            pointStyle={{ fill: '#0099ff' }}
          />
        </Chart>
      </Paper>
    );
  }
}
