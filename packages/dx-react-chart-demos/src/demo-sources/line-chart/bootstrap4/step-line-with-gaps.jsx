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
  Grid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale } from '@devexpress/dx-react-chart';
import {
  line,
  curveStep,
  symbol,
  symbolCircle,
} from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Point = color => (props) => {
  const {
    x, y, value,
  } = props;
  if (value) {
    return (
      <path
        fill={color}
        transform={`translate(${x} ${y})`}
        d={symbol().size([10 ** 2]).type(symbolCircle)()}
      />
    );
  }
  return null;
};

const LineWithPoint = color => props => (
  <React.Fragment>
    <LineSeries.Path
      {...props}
      color={color}
      path={line()
        .defined(d => d.value)
        .x(({ x }) => x)
        .y(({ y }) => y)
        .curve(curveStep)}
    />
    <ScatterSeries.Path {...props} pointComponent={Point(color)} />
  </React.Fragment>
);

const colors = {
  'Bronze Medals': '#cd7f32',
  'Silver Medals': '#c0c0c0',
  'Gold Medals': '#ffd700',
};

const BronzeLine = LineWithPoint(colors['Bronze Medals']);
const SilverLine = LineWithPoint(colors['Silver Medals']);
const GoldLine = LineWithPoint(colors['Gold Medals']);

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
      flexDirection: 'row', justifyContent: 'center', width: '100%',
    }}
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
      <Card>
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
          <Legend position="bottom" markerComponent={Marker} rootComponent={Root} />
          <Title text="Australian Medal Count" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
