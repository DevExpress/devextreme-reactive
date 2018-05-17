/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Grid,
  BarSeries,
  LineSeries,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Card } from 'reactstrap';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { month: 'Jan', sale: 50, total: 987 },
        { month: 'Feb', sale: 100, total: 3000 },
        { month: 'March', sale: 30, total: 1100 },
        { month: 'April', sale: 107, total: 7100 },
        { month: 'May', sale: 95, total: 4300 },
        { month: 'June', sale: 150, total: 7500 },
      ],
      width: 700,
      height: 400,
    };
  }
  render() {
    const {
      data: chartData, width, height,
    } = this.state;
    return (
      <Card>
        <Chart
          data={chartData}
          width={width}
          height={height}
        >

          <ArgumentAxis
            name="month"
            type="band"
          />
          <ValueAxis name="sale" />
          <ValueAxis name="total" position="right" />

          <Grid name="month" />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            axisName="sale"
            stack="a"
            style={{ stroke: 'none', fill: '#ff6666' }}
          />

          <LineSeries
            name="Total Transactions"
            valueField="total"
            argumentField="month"
            axisName="total"
            stack="a"
            style={{ stroke: 'blue' }}
          />

          <Legend />
        </Chart>
      </Card>
    );
  }
}
