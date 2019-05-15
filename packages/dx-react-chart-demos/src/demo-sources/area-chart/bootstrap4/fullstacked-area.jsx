import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';

import { carbonEmmision as data } from '../../../demo-data/data-vizualization';

const LegendRoot = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const ChartRoot = props => (
  <Chart.Root
    {...props}
    className="pr-3"
  />
);

const format = () => tick => tick;
const formatForFullstack = scale => scale.tickFormat(null, '%');
const stacks = [{
  series: ['Liquids', 'Solids', 'Gas', 'Cement Production', 'Gas Flaring'],
}];

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
          rootComponent={ChartRoot}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis tickFormat={formatForFullstack} />

          <AreaSeries
            name="Liquids"
            valueField="liquids"
            argumentField="year"
          />
          <AreaSeries
            name="Solids"
            valueField="solids"
            argumentField="year"
          />
          <AreaSeries
            name="Gas"
            valueField="gas"
            argumentField="year"
          />
          <AreaSeries
            name="Cement Production"
            valueField="cementProduction"
            argumentField="year"
          />
          <AreaSeries
            name="Gas Flaring"
            valueField="gasFlaring"
            argumentField="year"
          />
          <Animation />
          <Legend position="bottom" rootComponent={LegendRoot} />
          <Title text="Carbon Emission Estimates" />
          <Stack stacks={stacks} offset={stackOffsetExpand} />
        </Chart>
      </div>
    );
  }
}
