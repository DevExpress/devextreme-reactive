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
import { Scale } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const data = [
  { month: 'Jan', appStore: 101, googlePlay: 13 },
  { month: 'Feb', appStore: 89, googlePlay: 15 },
  { month: 'Mar', appStore: 107, googlePlay: 20 },
  { month: 'Apr', appStore: 113, googlePlay: 17 },
  { month: 'May', appStore: 105, googlePlay: 21 },
  { month: 'Jun', appStore: 91, googlePlay: 22 },
  { month: 'Jul', appStore: 110, googlePlay: 23 },
  { month: 'Aug', appStore: 111, googlePlay: 25 },
  { month: 'Sep', appStore: 112, googlePlay: 27 },
  { month: 'Oct', appStore: 111, googlePlay: 30 },
  { month: 'Nov', appStore: 120, googlePlay: 35 },
  { month: 'Dec', appStore: 160, googlePlay: 45 },
];

const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ x }) => x)
      .y1(({ y }) => y)
      .y0(({ y1 }) => y1)
      .curve(curveCatmullRom)}
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

          <Grid />

          <AreaSeries
            name="App Store"
            valueField="appStore"
            argumentField="month"
            seriesComponent={Area}
          />
          <AreaSeries
            name="Google Play"
            valueField="googlePlay"
            argumentField="month"
            seriesComponent={Area}
          />
          <Scale extensions={[{ type: 'band', constructor: scalePoint }]} />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="iOS App Store vs Google Play Revenue in 2012" className="w-100 text-center mb-2" />
        </Chart>
      </Card>
    );
  }
}
