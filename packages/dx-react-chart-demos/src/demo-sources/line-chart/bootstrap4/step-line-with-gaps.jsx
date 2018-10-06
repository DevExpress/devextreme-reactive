import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  ScatterSeries,
  ValueGrid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale, Animation } from '@devexpress/dx-react-chart';
import {
  line,
  curveStep,
  symbol,
  symbolCircle,
} from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Point = (props) => {
  const {
    x, y, value, color, style,
  } = props;
  if (value) {
    return (
      <path
        fill={color}
        transform={`translate(${x} ${y})`}
        d={symbol().size([10 ** 2]).type(symbolCircle)()}
        style={style}
      />
    );
  }
  return null;
};

const LineWithPoint = props => (
  <React.Fragment>
    <LineSeries.Path
      {...props}
      path={line()
        .defined(d => d.value)
        .x(({ x }) => x)
        .y(({ y }) => y)
        .curve(curveStep)}
    />
    <ScatterSeries.Path {...props} pointComponent={Point} />
  </React.Fragment>
);

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const format = () => tick => tick;
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

          <LineSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="year"
            color="#cd7f32"
            seriesComponent={LineWithPoint}
          />
          <LineSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="year"
            color="#c0c0c0"
            seriesComponent={LineWithPoint}
          />
          <LineSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="year"
            color="#ffd700"
            seriesComponent={LineWithPoint}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Australian Medal Count" className="w-100 text-center mb-2" />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
