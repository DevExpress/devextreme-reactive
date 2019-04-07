/* eslint-disable jsx-a11y/label-has-for */
import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-bootstrap4';
import { scaleTime } from 'd3-scale';
import { ArgumentScale } from '@devexpress/dx-react-chart';

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

const inputsContainerStyle = {
  display: 'flex',
  flexDIrection: 'row',
  justifyContent: 'center',
};

const ChartRoot = props => (
  <Chart.Root {...props} className="mr-3" />
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
      <div className="custom-control custom-checkbox m-3">
        <input type="checkbox" className="custom-control-input" id={id} checked={checked} onChange={this.submit} />
        <label className="custom-control-label" htmlFor={id}>{label}</label>
      </div>
    );
  }

  render() {
    const {
      data: chartData, zoomValue, panValue, zoomArgument, panArgument,
    } = this.state;
    return (
      <div className="card">
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
        <div style={inputsContainerStyle}>
          {this.renderInput('zoomArgument', 'Zoom argument')}
          {this.renderInput('panArgument', 'Pan argument')}
          {this.renderInput('zoomValue', 'Zoom value')}
          {this.renderInput('panValue', 'Pan value')}
        </div>
      </div>
    );
  }
}
