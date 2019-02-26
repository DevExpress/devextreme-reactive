import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import * as d3Format from 'd3-format';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  ArgumentScale, Stack, Animation, EventTracker, HoverState, SelectionState,
} from '@devexpress/dx-react-chart';

import { annualVehiclesSales } from '../../../demo-data/data-vizualization';

const overlayStyles = theme => ({
  paper: {
    border: `1px solid ${theme.palette.divider}`,
  },
});
const overlayBase = (props) => {
  const {
    children, target, ...restProps
  } = props;
  return (
    <Popover
      open
      anchorEl={target}
      anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      {...restProps}
    >
      {children}
    </Popover>
  );
};
const OverlayComponent = withStyles(overlayStyles, { name: 'overlayStyles' })(overlayBase);
const contentStyles = theme => ({
  head: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  root: {
    padding: theme.spacing.unit * 0.5,
  },
});
const contentBase = ({ classes, ...props }) => {
  const { targetItem } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.head}>
        {`${targetItem.series}`}
      </Typography>
      <Typography className={classes.body}>
        {d3Format.format(',.2r')(annualVehiclesSales[targetItem.point][targetItem.series])}
      </Typography>
    </div>
  );
};
const ContentComponent = withStyles(contentStyles, { name: 'contentStyles' })(contentBase);

const titleStyle = { marginRight: '120px' };
const TitleText = props => <Title.Text {...props} style={titleStyle} />;

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
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          <Title
            text="USA and Chinese annual sales of plug-in electric vehicles"
            textComponent={TitleText}
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
          <Legend />
          <EventTracker onClick={this.click} />
          <HoverState />
          <Tooltip contentComponent={ContentComponent} overlayComponent={OverlayComponent} />
          <SelectionState selection={selection} />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
