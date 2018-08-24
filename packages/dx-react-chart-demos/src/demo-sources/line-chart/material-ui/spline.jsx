import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import Typography from '@material-ui/core/Typography';
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
      .x(({ x, width }) => x + width / 2)
      .y(({ y }) => y)
      .curve(curveCatmullRom)}
  />
);

const Text = (props) => {
  const { text, subtext, ...restProps } = props;
  return (
    <div {...restProps}>
      <Typography component="h3" variant="headline">
        {text}
      </Typography>
      <Typography variant="subheading">{subtext}</Typography>
    </div>
  );
};

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
    style={{ flexDirection: 'column-reverse', width: 'auto' }}
  />
);
const Label = props => (
  <Legend.Label
    {...props}
    style={{ marginBottom: '8px' }}
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
      <Paper>
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
      </Paper>
    );
  }
}
