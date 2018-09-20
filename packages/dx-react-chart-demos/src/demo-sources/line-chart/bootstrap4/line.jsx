import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale } from '@devexpress/dx-react-chart';

import { confidence as data } from '../../../demo-data/data-vizualization';

const format = () => tick => tick;
const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);
const Item = props => (
  <Legend.Item
    {...props}
    className="flex-column"
  />
);
const Label = props => (
  <Legend.Label
    {...props}
    className="pt-2"
  />
);

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};
const EmptyComponent = () => null;

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
      <Card>
        <Chart
          data={chartData}
          className="pr-3"
        >
          <ArgumentAxis name="argumentAxis" tickFormat={format} />
          <ValueAxis
            max={50}
            labelComponent={ValueLabel}
            lineComponent={EmptyComponent}
            tickSize={0}
          />
          <Grid />

          <LineSeries
            name="TV news"
            valueField="tvNews"
            argumentField="year"
          />
          <LineSeries
            name="Church"
            valueField="church"
            argumentField="year"
          />
          <LineSeries
            name="Military"
            valueField="military"
            argumentField="year"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
            className="w-100 text-center mb-2"
          />
          <Scale />
        </Chart>
      </Card>
    );
  }
}
