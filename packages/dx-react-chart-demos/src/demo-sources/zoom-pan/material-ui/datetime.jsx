import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleTime } from 'd3-scale';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const generateData = (n) => {
  const ret = [];
  let y = 0;
  const dt = new Date(2017, 2, 10);
  for (let i = 0; i < n; i += 1) {
    dt.setDate(dt.getDate() + 1);
    y += Math.round(Math.random() * 10 - 5);
    ret.push({ x: new Date(dt), y });
  }
  return ret;
};
const data = generateData(100);

const getMode = (zoom, pan) => {
  if (zoom && pan) {
    return 'both';
  }
  if (zoom && !pan) {
    return 'zoom';
  }
  if (!zoom && pan) {
    return 'pan';
  }
  return 'none';
};

const chartRootStyle = { marginRight: '20px' };
const inputsContainerStyle = { justifyContent: 'center' };

const ChartRoot = props => (
  <Chart.Root {...props} style={chartRootStyle} />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      zoomArgument: true,
      panArgument: true,
      zoomValue: false,
      panValue: false,
    };
    this.submit = e => this.setState({
      [e.target.id]: e.target.checked,
    });
  }

  renderInput(id, label) {
    const { [id]: checked } = this.state;
    return (
      <FormControlLabel
        control={(
          <Checkbox
            id={id}
            checked={checked}
            onChange={this.submit}
            value="checkedB"
            color="primary"
          />
        )}
        label={label}
      />
    );
  }

  render() {
    const {
      data: chartData, zoomValue, panValue, zoomArgument, panArgument,
    } = this.state;
    return (
      <Paper>
        <Chart data={chartData} rootComponent={ChartRoot}>
          <ArgumentScale factory={scaleTime} />
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries valueField="y" argumentField="x" />
          <ZoomAndPan
            interactionWithArguments={getMode(zoomArgument, panArgument)}
            interactionWithValues={getMode(zoomValue, panValue)}
          />
        </Chart>
        <FormGroup style={inputsContainerStyle} row>
          {this.renderInput('zoomArgument', 'Zoom argument')}
          {this.renderInput('panArgument', 'Pan argument')}
          {this.renderInput('zoomValue', 'Zoom value')}
          {this.renderInput('panValue', 'Pan value')}
        </FormGroup>
      </Paper>
    );
  }
}
