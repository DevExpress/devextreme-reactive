import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import { Scale } from '@devexpress/dx-react-chart';
import { scalePoint } from 'd3-scale';

const data = [
  { year: '2010', android: 67225, ios: 46598 },
  { year: '2011', android: 179873, ios: 90560 },
  { year: '2012', android: 310088, ios: 118848 },
  { year: '2015', android: 539318, ios: 189924 },
];

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%',
    }}
  />
);
const Item = props => (
  <Legend.Item
    {...props}
    style={{ width: 'auto', flexDirection: 'column' }}
  />
);
const Label = props => (
  <Legend.Label
    {...props}
    style={{ marginTop: '8px' }}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
          style={{ paddingRight: '20px' }}
        >
          <ArgumentAxis />
          <ValueAxis />
          <Grid />

          <AreaSeries
            name="Android"
            valueField="android"
            argumentField="year"
          />
          <AreaSeries
            name="iOS"
            valueField="ios"
            argumentField="year"
          />
          <Scale extensions={[{ type: 'band', constructor: scalePoint }]} />
          <Legend
            position="bottom"
            rootComponent={Root}
            itemComponent={Item}
            labelComponent={Label}
          />
          <Title
            text="Worldwide Sales to End Users by OS"
            style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}
          />
        </Chart>
      </Paper>
    );
  }
}
