import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
} from '@devexpress/dx-react-chart-svg';
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
        ]}
      >

        <ArgumentAxis />
        <ValueAxis name="age" />

        <AreaSeries
          name="Young"
          style={{ stroke: 'none', fill: 'rgba(200, 141, 214, 0.6)' }}
        />
        <AreaSeries
          name="Middle"
          style={{ stroke: 'none', fill: 'rgba(138, 209, 132, 0.6)' }}
        />
        <AreaSeries
          name="Older"
          style={{ stroke: 'none', fill: 'rgba(120, 170, 227, 0.6)' }}
        />
      </Chart>
    );
  }
}
