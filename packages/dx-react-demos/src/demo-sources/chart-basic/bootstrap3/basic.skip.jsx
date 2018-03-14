/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { Rect } from '@devexpress/dx-react-chart';
import {
  Chart,
  Axis,
  LineSeries,
  SplineSeries,
} from '@devexpress/dx-react-chart-svg';

const data = [
  {
    year: 1995, Russia: 101, China: 170, USA: 31,
  },
  {
    year: 1998, Russia: 200, China: 80, USA: 90,
  },
  {
    year: 2000, Russia: 100, China: 70, USA: 45,
  },
  {
    year: 2001, Russia: 110, China: 70, USA: 75,
  },
  {
    year: 2002, Russia: 95, China: 120, USA: 25,
  },
  {
    year: 2006, Russia: 115, China: 50, USA: 45,
  },
  {
    year: 2007, Russia: 230, China: 110, USA: 120,
  },
  {
    year: 2015, Russia: 89, China: 90, USA: 19,
  },
];

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
        <Rect placeholder="bottom-left" />
        <Rect placeholder="bottom-right" color="gray" />
        <Rect placeholder="top-left" color="red" />
        <Rect placeholder="top-right" color="green" />

        <Axis name="year" placeholder="bottom-right" />
        <Axis name="born" placeholder="top-left" />

        <LineSeries
          name="Russia"
          style={{ stroke: 'red' }}
          placeholder="top-right"
        />
        <SplineSeries
          name="China"
          style={{ stroke: 'orange' }}
          placeholder="top-right"
        />
        <LineSeries name="USA" placeholder="top-right" />
      </Chart>
    );
  }
}
