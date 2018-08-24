import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { Stack, Scale } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';
import { carbonEmmision as data } from '../../../demo-data/data-vizualization';

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%',
    }}
  />
);

const Item = props => (
  <Legend.Item
    {...props}
    style={{ width: 'auto' }}
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
    const {
      data: chartData, offset, valueFormat,
    } = this.state;

    return (
      <Paper>
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
            stack="a"
          />
          <AreaSeries
            name="Solids"
            valueField="solids"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Gas"
            valueField="gas"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Cement Production"
            valueField="cementProduction"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Gas Flaring"
            valueField="gasFlaring"
            argumentField="year"
            stack="a"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} />
          <Title text="Carbon Emission Estimates" style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }} />
          <Scale />
          <Stack offset={offset} />
        </Chart>
        <div style={{ width: '200px', marginLeft: '50px', paddingBottom: '30px' }}>
          <Typography component="h5" variant="headline" style={{ marginTop: '0px', marginBottom: '8px' }}>Series Type</Typography>
          <FormControl>
            <NativeSelect onChange={this.changeSeriesType} defaultValue={1}>
              <option value={1}>Stacked Area</option>
              <option value={2}>Fullstacked Area</option>
            </NativeSelect>
          </FormControl>
        </div>
      </Paper>
    );
  }
}
