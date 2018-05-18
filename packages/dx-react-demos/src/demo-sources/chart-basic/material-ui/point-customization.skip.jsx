/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Grid,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
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

const DiamondPoint = Point(symbolDiamond, {
  stroke: 'white',
  strokeWidth: '1px',
  fill: 'red',
});

const CrossPoint = Point(symbolCross, {
  stroke: 'white',
  strokeWidth: '1px',
  fill: 'green',
});

const StarPoint = Point(symbolStar, {
  stroke: 'white',
  strokeWidth: '1px',
  fill: 'blue',
});

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      width: 700,
      height: 400,
    };
  }
  render() {
    const {
      data: chartData, width, height,
    } = this.state;
    return (
      <Paper>
        <Chart
          data={chartData}
          width={width}
          height={height}
        >

          <ArgumentAxis name="year" />
          <ValueAxis name="born" />

          <Grid name="year" />
          <Grid name="born" />

          <LineSeries
            name="Russia"
            valueField="ru"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'red' }}
            pointComponent={DiamondPoint}
          />
          <LineSeries
            name="China"
            valueField="ch"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'green' }}
            pointComponent={CrossPoint}
          />
          <LineSeries
            name="USA"
            valueField="us"
            argumentField="year"
            axisName="born"
            style={{ stroke: 'blue' }}
            pointComponent={StarPoint}
          />
        </Chart>
      </Paper>
    );
  }
}
