import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack, Scale, Animation } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';

import { carbonEmmision as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const format = () => tick => tick;
const formatForFullstack = scale => scale.tickFormat(null, '%');

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      offset: null,
      valueFormat: null,
    };

    this.changeSeriesType = this.changeSeriesType.bind(this);
  }

  changeSeriesType(e) {
    if (e.target.value === '1') {
      this.setState({ offset: null, valueFormat: null });
    } else {
      this.setState({ offset: stackOffsetExpand, valueFormat: formatForFullstack });
    }
  }

  render() {
    const { data: chartData, offset, valueFormat } = this.state;

    return (
      <div className="card">
        <Chart
          data={chartData}
          className="pr-3"
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            tickFormat={valueFormat}
          />

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
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Carbon Emission Estimates" />
          <Scale />
          <Stack
            stacks={[{
              series: ['Liquids', 'Solids', 'Gas', 'Cement Production', 'Gas Flaring'],
            }]}
            offset={offset}
          />
        </Chart>
        <div className="pb-5 pl-5 w-200" style={{ width: '200px' }}>
          <h5>Series Type</h5>
          <select className="custom-select" onChange={this.changeSeriesType}>
            <option defaultValue value="1">Stacked Area</option>
            <option value="2">Fullstacked Area</option>
          </select>
        </div>
      </div>

    );
  }
}
