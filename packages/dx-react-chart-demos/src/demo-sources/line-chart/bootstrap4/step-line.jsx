import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';
import { line, curveStep } from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ x }) => x)
      .y(({ y }) => y)
      .curve(curveStep)}
  />
);

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const Marker = (props) => {
  const { className, color, ...restProps } = props;
  return (
    <svg {...restProps} className={className} fill={color} width="10" height="10">
      <rect {...restProps} x={0} y={0} width={10} height={10} />
    </svg>
  );
};

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
            seriesComponent={Line}
          />
          <LineSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="year"
            color="#c0c0c0"
            seriesComponent={Line}
          />
          <LineSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="year"
            color="#ffd700"
            seriesComponent={Line}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} markerComponent={Marker} />
          <Title
            text="Australian Medal Count"
          />
        </Chart>
      </div>
    );
  }
}
