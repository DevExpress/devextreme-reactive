/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Grid,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from 'material-ui/Paper';
import {
  symbol,
  symbolCross,
  symbolDiamond,
  symbolStar,
} from 'd3-shape';
import { born as data } from '../../../demo-data/data-vizualization';

const Point = (type, styles) => (props) => {
  const {
    x, y,
  } = props;
  return (
    <path
      transform={`translate(${x} ${y})`}
      d={symbol().size([10 ** 2]).type(type)()}
      style={styles}
    />
  );
};

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

          <LineSeries
            name="Russia"
            style={{ stroke: 'red' }}
            pointComponent={Point(symbolDiamond, {
            stroke: 'white',
            strokeWidth: '1px',
            fill: 'red',
          })}
          />
          <LineSeries
            name="China"
            style={{ stroke: 'green' }}
            pointComponent={Point(symbolCross, {
            stroke: 'white',
            strokeWidth: '1px',
            fill: 'green',
          })}
          />
          <LineSeries
            name="USA"
            style={{ stroke: 'blue' }}
            pointComponent={Point(symbolStar, {
            stroke: 'white',
            strokeWidth: '1px',
            fill: 'blue',
          })}
          />
        </Chart>
      </Paper>
    );
  }
}
