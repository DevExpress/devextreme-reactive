/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Axis,
  Grid,
  Chart,
  Legend,
  LineSeries,
  AreaSeries,
  SplineSeries,
  ScatterSeries,
} from '@devexpress/dx-react-chart-svg';
import { born as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }
  render() {
    return (
      <Chart
        data={this.state.data}
        width={700}
        height={400}
        style={{ border: '1px dashed gray' }}
        axes={[
          {
            name: 'year',
            orientation: 'horizontal',
          },
          {
            name: 'born',
            orientation: 'vertical',
          },
        ]}
        series={[
          { valueField: 'Russia', argumentField: 'year', axisName: 'born' },
          { valueField: 'China', argumentField: 'year', axisName: 'born' },
          { valueField: 'USA', argumentField: 'year', axisName: 'born' },
        ]}
      >

        <Legend />
        <Axis name="year" position="bottom" />
        {/* <Axis name="year" position="top" /> */}
        <Axis name="born" position="left" />
        {/* <Axis name="born" position="right" /> */}

        <Grid name="born" />
        <Grid name="year" />

        <LineSeries
          name="Russia"
          style={{ stroke: 'red' }}
          point={{ visible: true, style: { fill: 'green' } }}
        />
        <ScatterSeries
          name="China"
          style={{ stroke: 'orange', fill: 'blue' }}
        />
        <SplineSeries
          name="China"
          style={{ stroke: 'green' }}
          point={{ visible: false }}
        />
        {/* <LineSeries
          name="China"
          style={{ stroke: '#2ed9d0' }}
        /> */}
        <AreaSeries
          name="USA"
          style={{ fill: 'rgba(255,0,0,0.3)', stroke: 'none' }}
          point={{ visible: true, style: { fill: 'orange' } }}
        />
      </Chart>
    );
  }
}
