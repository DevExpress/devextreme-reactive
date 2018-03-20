/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Axis,
  Grid,
  Chart,
  Legend,
  LineSeries,
  SplineSeries,
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
        />
        <SplineSeries
          name="China"
          style={{ stroke: 'orange' }}
        />
        <LineSeries name="USA" />
      </Chart>
    );
  }
}
