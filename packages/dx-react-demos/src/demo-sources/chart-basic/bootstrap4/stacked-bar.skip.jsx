import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Grid,
  BarSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Card } from 'reactstrap';
import { ageStructure } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: ageStructure,
      width: 700,
      height: 400,
      series: [
        {
          valueField: 'young',
          argumentField: 'state',
          axisName: 'age',
          name: 'Young',
          stack: 'a',
        }, {
          valueField: 'middle',
          argumentField: 'state',
          axisName: 'age',
          name: 'Middle',
          stack: 'a',
        }, {
          valueField: 'older',
          argumentField: 'state',
          axisName: 'age',
          name: 'Older',
          stack: 'a',
        },
      ],
      axes: [{ name: 'age', min: 0 }, { name: 'state', type: 'band' }],
    };
  }
  render() {
    const {
      data: chartData, width, height, series, axes,
    } = this.state;
    return (
      <Card>
        <Chart
          data={chartData}
          width={width}
          height={height}
          axes={axes}
          series={series}
        >

          <ArgumentAxis name="state" type="band" />
          <ValueAxis name="age" min={0} />

          <Grid name="state" />
          <Grid name="age" />

          <BarSeries
            name="Young"
            valueField="young"
            argumentField="state"
            axisName="age"
            stack="a"
            style={{ stroke: 'none', fill: '#ff6666' }}
          />
          <BarSeries
            name="Middle"
            valueField="middle"
            argumentField="state"
            axisName="age"
            stack="a"
            style={{ stroke: 'none', fill: '#9fff80' }}
          />
          <BarSeries
            name="Older"
            valueField="older"
            argumentField="state"
            axisName="age"
            stack="a"
            style={{ stroke: 'none', fill: '#9999ff' }}
          />
        </Chart>
      </Card>
    );
  }
}
