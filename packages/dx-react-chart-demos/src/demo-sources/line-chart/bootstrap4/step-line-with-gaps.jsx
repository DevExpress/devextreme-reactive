import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  ScatterSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';
import {
  line,
  curveStep,
} from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const pointOptions = { point: { size: 10 } };
const Point = (props) => {
  const { value } = props;
  if (value) {
    return (
      <ScatterSeries.Point {...props} {...pointOptions} />
    );
  }
  return null;
};

const LineWithPoint = props => (
  <>
    <LineSeries.Path
      {...props}
      path={line()
        .defined(d => d.value)
        .x(({ arg }) => arg)
        .y(({ val }) => val)
        .curve(curveStep)}
    />
    <ScatterSeries.Path {...props} pointComponent={Point} />
  </>
);

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
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
      <div className="card">
        <Chart
          data={chartData}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis />

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
          <Title text="Australian Medal Count" />
        </Chart>
      </div>
    );
  }
}
