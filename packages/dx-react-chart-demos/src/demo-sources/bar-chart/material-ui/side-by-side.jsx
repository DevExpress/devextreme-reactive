import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Scale } from '@devexpress/dx-react-chart';

import { olimpicMedals as data } from '../../../demo-data/data-vizualization';

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
    style={{ width: 'auto' }}
  />
);

const Bar = color => props => (
  <BarSeries.Point
    {...props}
    color={color}
  />
);
const colors = {
  'Bronze Medals': '#cd7f32',
  'Silver Medals': '#c0c0c0',
  'Gold Medals': '#ffd700',
};

const BronzeBar = Bar('#cd7f32');
const SilverBar = Bar('#c0c0c0');
const GoldBar = Bar('#ffd700');

const Marker = (props) => {
  const { name } = props;
  return (
    <Legend.Marker
      {...props}
      color={colors[name]}
    />
  );
};

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
        >
          <ArgumentAxis />
          <ValueAxis />
          <Grid />

          <BarSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="country"
            pointComponent={GoldBar}
          />
          <BarSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="country"
            pointComponent={SilverBar}
          />
          <BarSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="country"
            pointComponent={BronzeBar}
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} markerComponent={Marker} />
          <Title text="Olimpic Medals in 2008" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Stack />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}
