import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { area, curveStep } from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
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
          <ArgumentAxis tickFormat={format} />
          <ValueAxis />

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
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} markerComponent={Marker} />
          <Title text="Australian Medal Count" />
        </Chart>
      </Paper>
    );
  }
}
