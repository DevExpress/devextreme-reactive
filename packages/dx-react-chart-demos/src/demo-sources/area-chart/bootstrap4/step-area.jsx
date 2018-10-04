import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale, Animation } from '@devexpress/dx-react-chart';
import { area, curveStep } from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ x }) => x)
      .y1(({ y }) => y)
      .y0(({ y1 }) => y1)
      .curve(curveStep)}
  />
);

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
const EmptyComponent = () => null;
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
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            lineComponent={EmptyComponent}
            tickSize={0}
          />

          <ValueGrid />

          <AreaSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="year"
            color="#cd7f32"
            seriesComponent={Area}
          />
          <AreaSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="year"
            color="#c0c0c0"
            seriesComponent={Area}
          />
          <AreaSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="year"
            color="#ffd700"
            seriesComponent={Area}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} markerComponent={Marker} />
          <Title text="Australian Medal Count" className="w-100 text-center mb-2" />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
