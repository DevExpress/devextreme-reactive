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
    };
  }
  render() {
    return (
      <Card>
        <Chart
          data={this.state.data}
          width={700}
          height={400}
          axes={[
          { name: 'sale', min: 0 },
          { name: 'total' },
          { name: 'month', type: 'band' },
        ]}
          series={[
          {
            valueField: 'sale',
            argumentField: 'month',
            axisName: 'sale',
            name: 'Units Sold',
            stack: 'a',
          }, {
            valueField: 'total',
            argumentField: 'month',
            axisName: 'total',
            name: 'Total Transactions',
            stack: 'a',
          },
        ]}
        >

          <ArgumentAxis />
          <ValueAxis name="sale" />
          <ValueAxis name="total" position="right" />

          <Grid name="month" />

          <BarSeries
            name="Units Sold"
            style={{ stroke: 'none', fill: '#ff6666' }}
          />

          <LineSeries
            name="Total Transactions"
            style={{ stroke: 'blue' }}
          />

          <Legend />
        </Chart>
      </Card>
    );
  }
}
