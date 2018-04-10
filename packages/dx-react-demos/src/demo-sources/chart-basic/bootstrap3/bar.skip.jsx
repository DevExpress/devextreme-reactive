/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-svg';
import { contributors as data } from '../../../demo-data/data-vizualization';

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
            name: 'Name',
            orientation: 'horizontal',
            type: 'band',
          },
          {
            name: 'commits',
            orientation: 'vertical',
          },
        ]}
        series={[
          {
            valueField: 'contributions',
            argumentField: 'login',
            axisName: 'commits',
            name: 'BarSeries',
          },
        ]}
      >

        <ArgumentAxis name="Name" position="bottom" />
        <ValueAxis name="commits" position="left" />

        <BarSeries
          name="BarSeries"
          style={{ stroke: 'none', fill: 'darkblue' }}
        />
      </Chart>
    );
  }
}
