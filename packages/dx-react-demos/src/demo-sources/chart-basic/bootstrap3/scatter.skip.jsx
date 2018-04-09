/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Axis,
  Grid,
  Chart,
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
        ]}
      >

        <Axis name="year" position="bottom" />
        <Axis name="born" position="left" />

        <Grid name="born" />
        <Grid name="year" />

        <ScatterSeries
          name="Russia"
          style={{ stroke: 'red', fill: 'white' }}
        />
        <ScatterSeries
          name="China"
          style={{ stroke: 'orange', fill: 'blue' }}
        />
      </Chart>
    );
  }
}
