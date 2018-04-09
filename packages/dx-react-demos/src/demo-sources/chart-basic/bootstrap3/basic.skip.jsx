/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  AreaSeries,
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
          {
            valueField: 'Russia',
            argumentField: 'year',
            axisName: 'born',
            point: { size: 10 },
          },
          { valueField: 'China', argumentField: 'year', axisName: 'born' },
          { valueField: 'USA', argumentField: 'year', axisName: 'born' },
        ]}
      >

        <ArgumentAxis name="year" position="bottom" />
        <ValueAxis name="born" position="left" />

        <LineSeries
          name="Russia"
          style={{ stroke: 'red' }}
          pointStyle={{ fill: 'green' }}
        />
        <SplineSeries
          name="China"
          style={{ stroke: 'green' }}
        />
        <AreaSeries
          name="USA"
          style={{ fill: 'rgba(255,0,0,0.3)', stroke: 'none' }}
          pointStyle={{ fill: 'orange' }}
        />
      </Chart>
    );
  }
}
