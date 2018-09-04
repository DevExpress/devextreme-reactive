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
import { Stack, Scale } from '@devexpress/dx-react-chart';
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
      <Card>
        <Chart
          data={chartData}
          style={{ paddingRight: '20px' }}
        >
          <ArgumentAxis name="argumentAxis" tickFormat={format} />
          <ValueAxis tickFormat={valueFormat} />

          <Grid />
          <AreaSeries
            name="Liquids"
            valueField="liquids"
            argumentField="year"
            stack="one"
          />
          <AreaSeries
            name="Solids"
            valueField="solids"
            argumentField="year"
            stack="one"
          />
          <AreaSeries
            name="Gas"
            valueField="gas"
            argumentField="year"
            stack="one"
          />
          <AreaSeries
            name="Cement Production"
            valueField="cementProduction"
            argumentField="year"
            stack="one"
          />
          <AreaSeries
            name="Gas Flaring"
            valueField="gasFlaring"
            argumentField="year"
            stack="one"
          />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="Carbon Emission Estimates" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Scale />
          <Stack offset={offset} />
        </Chart>
        <div style={{ width: '200px', marginLeft: '50px', paddingBottom: '30px' }}>
          <h5>Series Type</h5>
          <select className="custom-select" onChange={this.changeSeriesType.bind(this)}>
            <option defaultValue value="1">Stacked Area</option>
            <option value="2">Fullstacked Area</option>
          </select>
        </div>
      </Card>

    );
  }
}
