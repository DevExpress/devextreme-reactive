/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { Rect } from '@devexpress/dx-react-chart';
import { Chart } from '@devexpress/dx-react-chart-svg';
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
            valueField: 'ru',
            argumentField: 'year',
            axisName: 'born',
            name: 'Russia',
            point: { size: 10 },
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
        ]}
      >
        <Rect height={10} placeholder="top" color="green" />
        <Rect height={20} placeholder="bottom" color="blue" />
        <Rect placeholder="pane" color="red" />
        <Rect width={40} height={60} placeholder="left" color="pink" />
        <Rect width={20} height={80} placeholder="right" color="yellow" />
      </Chart>
    );
  }
}
