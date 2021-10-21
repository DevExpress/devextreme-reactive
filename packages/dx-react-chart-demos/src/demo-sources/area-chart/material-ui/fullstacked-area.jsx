import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';
import { carbonEmmision as data } from '../../../demo-data/data-vizualization';

const setStyle = (style) => {
  const wrap = withStyles({ root: style });
  return Target => wrap(({ classes, className, ...restProps }) => (
    <Target className={classNames(classes.root, className)} {...restProps} />
  ));
};

const LegendRoot = setStyle({
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
})(Legend.Root);

const LegendLabel = setStyle({
  whiteSpace: 'nowrap',
})(Legend.Label);

const ChartRoot = setStyle({
  paddingRight: '20px',
})(Chart.Root);

const format = () => tick => tick;
const formatForFullstack = scale => scale.tickFormat(null, '%');
const stacks = [{
  series: ['Liquids', 'Solids', 'Gas', 'Cement Production', 'Gas Flaring'],
}];

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
          rootComponent={ChartRoot}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis tickFormat={formatForFullstack} />
          <AreaSeries
            name="Liquids"
            valueField="liquids"
            argumentField="year"
          />
          <AreaSeries
            name="Solids"
            valueField="solids"
            argumentField="year"
          />
          <AreaSeries
            name="Gas"
            valueField="gas"
            argumentField="year"
          />
          <AreaSeries
            name="Cement Production"
            valueField="cementProduction"
            argumentField="year"
          />
          <AreaSeries
            name="Gas Flaring"
            valueField="gasFlaring"
            argumentField="year"
          />
          <Animation />
          <Legend position="bottom" rootComponent={LegendRoot} labelComponent={LegendLabel} />
          <Title text="Carbon Emission Estimates" />
          <Stack stacks={stacks} offset={stackOffsetExpand} />
        </Chart>
      </Paper>
    );
  }
}
