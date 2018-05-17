/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
import { ageStructure } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: ageStructure,
      width: 700,
      height: 400,
      axes: [{ name: 'age', min: 0 }, { name: 'state', type: 'band' }],
      series: [
        {
          valueField: 'young',
          argumentField: 'state',
          axisName: 'age',
          name: 'Young',
        }, {
          valueField: 'middle',
          argumentField: 'state',
          axisName: 'age',
          name: 'Middle',
        }, {
          valueField: 'older',
          argumentField: 'state',
          axisName: 'age',
          name: 'Older',
        },
      ],
    };
  }
  render() {
    const {
      data: chartData, width, height, series, axes,
    } = this.state;
    return (
      <Paper>
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
            valueField="young"
            argumentField="state"
            axisName="age"
            name="Young"
            style={{ stroke: 'none', fill: '#ff6666' }}
          />
          <BarSeries
            valueField="middle"
            argumentField="state"
            axisName="age"
            name="Middle"
            style={{ stroke: 'none', fill: '#9fff80' }}
          />
          <BarSeries
            valueField="older"
            argumentField="state"
            axisName="age"
            name="Older"
            style={{ stroke: 'none', fill: '#9999ff' }}
          />
        </Chart>
      </Paper>
    );
  }
}
