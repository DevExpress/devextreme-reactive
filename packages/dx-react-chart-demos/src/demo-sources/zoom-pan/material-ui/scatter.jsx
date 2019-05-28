import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
  ArgumentScale,
  ValueScale,
  EventTracker,
  HoverState,
  Animation,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  ScatterSeries,
  Tooltip,
  ZoomAndPan,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { format } from 'd3-format';

import { lifeBirth } from '../../../demo-data/life-birth';

const groupData = data => data.map(({
  birthRate, lifeExp, year, country,
}) => ({
  [`birthRate_${year}`]: birthRate,
  [`lifeExp_${year}`]: lifeExp,
  year,
  country,
}));

const adjustDomain = ([start, end]) => [Math.floor(start), Math.ceil(end)];

const formatTooltipValue = format('.2f');
const tooltipContentArgStyle = {
  paddingBottom: 0,
};
const tooltipContentValStyle = {
  paddingTop: 0,
};
const TooltipContent = ({ targetItem, data, ...restProps }) => {
  const item = data[targetItem.point];
  const title = `${item.country} ${item.year}`;
  const arg = item[`lifeExp_${targetItem.series}`];
  const val = item[`birthRate_${targetItem.series}`];
  return (
    <div>
      <div>{title}</div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentArgStyle}
          text={`Life Expectancy: ${formatTooltipValue(arg)}`}
        />
      </div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentValStyle}
          text={`Birth Rate: ${formatTooltipValue(val)}`}
        />
      </div>
    </div>
  );
};

const ResetButton = withStyles(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}))(({ classes, ...props }) => (
  <Button variant="outlined" color="primary" className={classes.button} {...props}>Reset</Button>
));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    const data = groupData(lifeBirth);
    this.state = {
      data,
      viewport: null,
    };
    this.changeViewport = viewport => this.setState({ viewport });
    this.resetViewport = () => this.setState({ viewport: null });

    this.TooltipContent = allProps => <TooltipContent {...allProps} data={data} />;
  }

  render() {
    const { data, viewport } = this.state;
    return (
      <React.Fragment>
        <ResetButton onClick={this.resetViewport} />
        <Paper>
          <Chart data={data}>
            <ArgumentScale modifyDomain={adjustDomain} />
            <ValueScale modifyDomain={adjustDomain} />
            <ArgumentAxis />
            <ValueAxis />

            <ScatterSeries
              name="1970"
              valueField="birthRate_1970"
              argumentField="lifeExp_1970"
            />
            <ScatterSeries
              name="2010"
              valueField="birthRate_2010"
              argumentField="lifeExp_2010"
            />

            <EventTracker />
            <HoverState />
            <Tooltip contentComponent={this.TooltipContent} />

            <ZoomAndPan
              viewport={viewport}
              onViewportChange={this.changeViewport}
              interactionWithValues="both"
            />
            <Title text="Life Expectancy vs. Birth Rates" />
            <Legend />
            <Animation />
          </Chart>
        </Paper>
      </React.Fragment>
    );
  }
}
