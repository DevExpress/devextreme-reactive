import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Scale, Animation } from '@devexpress/dx-react-chart';
import { area, curveStep } from 'd3-shape';

import { australianMedals as data } from '../../../demo-data/data-vizualization';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const demoStyles = () => ({
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
});

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ x }) => x)
      .y1(({ y }) => y)
      .y0(({ y1 }) => y1)
      .curve(curveStep)}
  />
);

const format = () => tick => tick;

const Marker = (props) => {
  const { name } = props;
  if (name === 'Bronze Medals') {
    return (
      <span role="img" aria-label="Bronze Medal">🥉</span>
    );
  }
  if (name === 'Silver Medals') {
    return (
      <span role="img" aria-label="Silver Medal">🥈</span>
    );
  }
  return (
    <span role="img" aria-label="Gold Medal">🏅</span>
  );
};
const EmptyComponent = () => null;
class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis lineComponent={EmptyComponent} tickComponent={EmptyComponent} />

          <ValueGrid />

          <AreaSeries
            name="Bronze Medals"
            valueField="bronze"
            argumentField="year"
            color="#cd7f32"
            seriesComponent={Area}
          />
          <AreaSeries
            name="Silver Medals"
            valueField="silver"
            argumentField="year"
            color="#c0c0c0"
            seriesComponent={Area}
          />
          <AreaSeries
            name="Gold Medals"
            valueField="gold"
            argumentField="year"
            color="#ffd700"
            seriesComponent={Area}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} markerComponent={Marker} />
          <Title text="Australian Medal Count" className={classes.title} />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
