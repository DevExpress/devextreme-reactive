/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from 'material-ui/Paper';
import { ageStructure } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: ageStructure,
    };
  }
  render() {
    return (
      <Paper>
        <Chart
          data={this.state.data}
          width={700}
          height={400}
          style={{
          border: '1px dashed lightgray',
        }}
          axes={[{ name: 'age', min: 0 }, { name: 'state', type: 'band' }]}
          series={[
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
        ]}
        >

          <ArgumentAxis />
          <ValueAxis name="age" />

          <BarSeries
            name="Young"
            style={{ stroke: 'none', fill: '#ff6666' }}
          />
          <BarSeries
            name="Middle"
            style={{ stroke: 'none', fill: '#9fff80' }}
          />
          <BarSeries
            name="Older"
            style={{ stroke: 'none', fill: '#9999ff' }}
          />
        </Chart>
      </Paper>
    );
  }
}
