/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from 'material-ui/Paper';
import { contributors as data } from '../../../demo-data/data-vizualization';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: data.slice(0, 7),
    };
  }
  render() {
    return (
      <Paper>
        <Chart
          data={this.state.data}
          width={700}
          height={400}
          series={[
          {
            valueField: 'contributions',
            argumentField: 'login',
            name: 'PieSeries',
          },
        ]}
        >

          <PieSeries
            name="PieSeries"
            style={{ stroke: 'white', fill: '#ff6666' }}
          />
        </Chart>
      </Paper>
    );
  }
}
