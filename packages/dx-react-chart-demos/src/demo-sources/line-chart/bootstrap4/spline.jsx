import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
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
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

const Text = (props) => {
  const { text } = props;
  const [mainText, subText] = text.split('\\n');
  return (
    <div className="w-100 text-center mb-2">
      <h3>
        {mainText}
      </h3>
      <p>{subText}</p>
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
      <div className="card">
        <Chart
          data={chartData}
          className="pr-4"
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

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
            text="Energy Consumption in 2004\n(Millions of Tons, Oil Equivalent)"
            textComponent={Text}
          />
          <Animation />
        </Chart>
      </div>
    );
  }
}
