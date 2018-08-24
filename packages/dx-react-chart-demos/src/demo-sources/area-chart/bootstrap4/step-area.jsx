import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale } from '@devexpress/dx-react-chart';
import { area, curveStep } from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      flexDirection: 'row', justifyContent: 'center', width: '100%',
    }}
  />
);

const Area = color => props => (
  <AreaSeries.Path
    {...props}
    color={color}
    path={area()
      .x(({ x }) => x)
      .y1(({ y }) => y)
      .y0(({ y1 }) => y1)
      .curve(curveStep)}
  />
);

const BronzeArea = Area('#cd7f32');
const SilverArea = Area('#c0c0c0');
const GoldArea = Area('#ffd700');

const format = () => tick => tick;

const Marker = (props) => {
  const { name } = props;
  if (name === 'Bronze Medals') {
    return (
      <span role="img" aria-label="Bronze Medal">🥉</span>
    );
  }
  if (name === 'Silver Medals') {
    return (
      <span role="img" aria-label="Silver Medal">🥈</span>
    );
  }
  return (
    <span role="img" aria-label="Gold Medal">🏅</span>
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
      <Card>
        <Chart
          data={chartData}
        >
          <ArgumentAxis name="argumentAxis" tickFormat={format} />
          <ValueAxis />

          <Grid />

          <AreaSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="year"
            seriesComponent={BronzeArea}
          />
          <AreaSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="year"
            seriesComponent={SilverArea}
          />
          <AreaSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="year"
            seriesComponent={GoldArea}
          />
          <Legend position="bottom" rootComponent={Root} markerComponent={Marker} />
          <Title text="Australian Medal Count" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
