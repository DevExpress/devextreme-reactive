/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  Axis,
  Grid,
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
        style={{ border: '1px dashed gray' }}
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
          { valueField: 'contributions', argumentField: 'login', axisName: 'commits' },
        ]}
      >

        <Axis name="Name" position="bottom" />
        {/* <Axis name="Name" position="top" /> */}
        <Axis name="commits" position="left" />
        {/* <Axis name="commits" position="right" /> */}

        <Grid name="Name" />
        <Grid name="commits" />

        <BarSeries
          name="contributions"
          style={{ stroke: 'none', fill: 'darkblue' }}
        />
      </Chart>
    );
  }
}
