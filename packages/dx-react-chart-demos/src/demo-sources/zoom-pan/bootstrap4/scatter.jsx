import * as React from 'react';
import {
  ArgumentScale,
  ValueScale,
  EventTracker,
  HoverState,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  ScatterSeries,
  Tooltip,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-bootstrap4';
import { format } from 'd3-format';

import { dataGenerator } from '../../../demo-data/generator';

const adjustDomain = ([start, end]) => [Math.floor(start), Math.ceil(end)];

const formatTooltipValue = format('.2f');
const TooltipContent = ({ targetItem, data, ...restProps }) => {
  const item = data[targetItem.point];
  const arg = item[targetItem.series === 'Series 1' ? 'arg1' : 'arg2'];
  const val = item[targetItem.series === 'Series 1' ? 'val1' : 'val2'];
  const text = `${formatTooltipValue(arg)} | ${formatTooltipValue(val)}`;
  return <Tooltip.Content {...restProps} text={text} />;
};

const ResetButton = props => (
  <button type="button" className="btn btn-outline-primary m-2" {...props}>Reset</button>
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    const data = dataGenerator(200);
    this.state = {
      data,
      viewport: null,
    };
    this.changeViewport = viewport => this.setState({ viewport });
    this.resetViewport = () => this.setState({ viewport: null });

    this.TooltipContent = allProps => <TooltipContent {...allProps} data={data} />;
  }

  render() {
    const { data, viewport } = this.state;
    return (
      <div>
        <ResetButton onClick={this.resetViewport} />
        <div className="card">
          <Chart data={data}>
            <ArgumentScale modifyDomain={adjustDomain} />
            <ValueScale modifyDomain={adjustDomain} />
            <ArgumentAxis />
            <ValueAxis />

            <ScatterSeries
              name="Series 1"
              valueField="val1"
              argumentField="arg1"
            />
            <ScatterSeries
              name="Series 2"
              valueField="val2"
              argumentField="arg2"
            />

            <EventTracker />
            <HoverState />
            <Tooltip contentComponent={this.TooltipContent} />

            <ZoomAndPan
              viewport={viewport}
              onViewportChange={this.changeViewport}
              interactionWithValues="both"
            />
          </Chart>
        </div>
      </div>
    );
  }
}
