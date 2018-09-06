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
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

import { energyConsumption as data } from '../../../demo-data/data-vizualization';

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ x }) => x)
      .y(({ y }) => y)
      .curve(curveCatmullRom)}
  />
);

const Text = (props) => {
  const { text, subtext, ...restProps } = props;
  return (
    <div {...restProps}>
      <h3>
        {text}
      </h3>
      <p>{subtext}</p>
    </div>
  );
};
const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);
const Item = props => (
  <Legend.Item
    {...props}
    className="flex-column-reverse"
  />
);
const Label = props => (
  <Legend.Label
    {...props}
    className="pb-2"
  />
);

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
          style={{ paddingRight: '30px' }}
        >
          <ArgumentAxis />
          <ValueAxis />
          <Grid />

          <LineSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Oil"
            valueField="oil"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Coal"
            valueField="coal"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
            seriesComponent={Line}
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text="Energy Consumption in 2004"
            subtext="(Millions of Tons, Oil Equivalent)"
            textComponent={Text}
            style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}
          />
          <Scale extensions={[{ type: 'band', constructor: scalePoint }]} />
        </Chart>
      </Card>
    );
  }
}
