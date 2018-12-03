import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-bootstrap4';
import * as d3Format from 'd3-format';
import {
  Stack, Scale, EventTracker, HoverState, SelectionState, Animation,
} from '@devexpress/dx-react-chart';

import { annualVehiclesSales } from '../../../demo-data/data-vizualization';

const ContentComponent = (props) => {
  const { targetItem } = props;
  return (
    <div>
      <p className="mb-0 font-weight-bold">
        {`${targetItem.series}`}
      </p>
      <p className="mb-0">
        {d3Format.format(',.2r')(annualVehiclesSales[targetItem.point][targetItem.series])}
      </p>
    </div>
  );
};
const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: annualVehiclesSales,
      selection: [],
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compare(selection[0], target) ? [] : [target],
        }));
      }
    };
  }

  render() {
    const { data: chartData, selection } = this.state;

    return (
      <Card>
        <Chart
          data={chartData}
        >
          <ArgumentAxis type="band" />
          <ValueAxis />

          <Title
            text="USA and Chinese annual sales of plug-in electric vehicles"
            style={{ textAlign: 'center', width: '100%' }}
          />

          <BarSeries
            name="USA"
            valueField="USA"
            argumentField="year"
          />
          <BarSeries
            name="China"
            valueField="China"
            argumentField="year"
          />
          <Stack />
          <Scale />
          <Legend />
          <EventTracker onClick={this.click} />
          <HoverState />
          <Tooltip contentComponent={ContentComponent} />
          <SelectionState selection={selection} />
          <Animation />
        </Chart>
      </Card>
    );
  }
}
