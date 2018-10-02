import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale } from '@devexpress/dx-react-chart';
import { scalePoint } from 'd3-scale';

const data = [
  { year: '2010', android: 67225, ios: 46598 },
  { year: '2011', android: 179873, ios: 90560 },
  { year: '2012', android: 310088, ios: 118848 },
  { year: '2015', android: 539318, ios: 189924 },
];

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
          <ArgumentAxis />
          <ValueAxis lineComponent={EmptyComponent} tickSize={0} />
          <ValueGrid />

          <AreaSeries
            name="Android"
            valueField="android"
            argumentField="year"
          />
          <AreaSeries
            name="iOS"
            valueField="ios"
            argumentField="year"
          />
          <Scale extensions={[{ type: 'band', constructor: scalePoint }]} />
          <Legend
            position="bottom"
            rootComponent={Root}
            itemComponent={Item}
            labelComponent={Label}
          />
          <Title
            text="Worldwide Sales to End Users by OS"
            className="w-100 text-center mb-2"
          />
        </Chart>
      </Card>
    );
  }
}
