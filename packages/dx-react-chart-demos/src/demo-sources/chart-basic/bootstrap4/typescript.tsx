import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Grid,
  LineSeries,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import * as React from 'react';
import { Card } from 'reactstrap';

interface IDataItem {
  month: string,
  sale: number,
  total: number,
}

const chartData: IDataItem[] = [
  { month: 'Jan', sale: 50, total: 987 },
  { month: 'Feb', sale: 100, total: 3000 },
  { month: 'March', sale: 30, total: 1100 },
  { month: 'April', sale: 107, total: 7100 },
  { month: 'May', sale: 95, total: 4300 },
  { month: 'June', sale: 150, total: 7500 },
];

export default class Demo extends React.Component<object, object> {
  public render(): React.ReactNode {
    return (
      <Card>
        <Chart
          data={chartData}
        >
          <ArgumentAxis
            name="month"
          />
          <ValueAxis name="sale" />
          <ValueAxis name="total" position="right" />

          <Grid name="sale" />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            axisName="sale"
            stack="a"
          />

          <LineSeries
            name="Total Transactions"
            valueField="total"
            argumentField="month"
            axisName="total"
            stack="a"
          />
        </Chart>
      </Card>
    );
  }
}
