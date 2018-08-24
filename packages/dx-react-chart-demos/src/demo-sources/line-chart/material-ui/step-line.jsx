import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import { Scale } from '@devexpress/dx-react-chart';
import { line, curveStep } from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Line = color => props => (
  <LineSeries.Path
    {...props}
    color={color}
    path={line()
      .x(({ x }) => x)
      .y(({ y }) => y)
      .curve(curveStep)}
  />
);

const colors = {
  'Bronze Medals': '#cd7f32',
  'Silver Medals': '#c0c0c0',
  'Gold Medals': '#ffd700',
};

const BronzeLine = Line(colors['Bronze Medals']);
const SilverLine = Line(colors['Silver Medals']);
const GoldLine = Line(colors['Gold Medals']);

const Marker = (props) => {
  const { name } = props;
  return (
    <Legend.Marker
      {...props}
      color={colors[name]}
    />
  );
};
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

const format = () => tick => tick;

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
          <ArgumentAxis name="argumentAxis" tickFormat={format} />
          <ValueAxis />
          <Grid />

          <LineSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="year"
            seriesComponent={BronzeLine}
          />
          <LineSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="year"
            seriesComponent={SilverLine}
          />
          <LineSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="year"
            seriesComponent={GoldLine}
          />
          <Legend position="bottom" markerComponent={Marker} rootComponent={Root} itemComponent={Item} />
          <Title
            text="Australian Medal Count"
            style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}
          />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}
