import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
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
        >
          <ArgumentAxis name="state" type="band" />
          <ValueAxis name="age" min={0} />

          <AreaSeries
            name="Young"
            valueField="young"
            argumentField="state"
            axisName="age"
            stack="a"
            style={{ stroke: 'none', fill: 'rgba(200, 141, 214, 0.6)' }}
          />
          <AreaSeries
            valueField="middle"
            argumentField="state"
            axisName="age"
            stack="a"
            name="Middle"
            style={{ stroke: 'none', fill: 'rgba(138, 209, 132, 0.6)' }}
          />
          <AreaSeries
            name="Older"
            valueField="older"
            argumentField="state"
            axisName="age"
            stack="a"
            style={{ stroke: 'none', fill: 'rgba(120, 170, 227, 0.6)' }}
          />
        </Chart>
      </Paper>
    );
  }
}
