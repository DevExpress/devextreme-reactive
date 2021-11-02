import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import * as d3Format from 'd3-format';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  ArgumentScale, Stack, Animation, EventTracker, HoverState, SelectionState,
} from '@devexpress/dx-react-chart';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {
  NavigateBefore, NavigateNext,
} from '@mui/icons-material/';
import Typography from '@mui/material/Typography';

import { annualVehiclesSales as data } from '../../../demo-data/data-vizualization';

const PREFIX = 'Demo';

const classes = {
  group: `${PREFIX}-group`,
  hoverGroup: `${PREFIX}-hoverGroup`,
  text: `${PREFIX}-text`,
};

const StyledDiv = styled('div')(() => ({
  [`&.${classes.text}`]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [`&.${classes.group}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  [`&.${classes.hoverGroup}`]: {
    width: '300px',
  },
}));

const tooltipContentTitleStyle = {
  fontWeight: 'bold',
  paddingBottom: 0,
};
const tooltipContentBodyStyle = {
  paddingTop: 0,
};
const formatTooltip = d3Format.format(',.2r');
const TooltipContent = (props) => {
  const { targetItem, text, ...restProps } = props;
  return (
    <div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentTitleStyle}
          text={targetItem.series}
        />
      </div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentBodyStyle}
          text={formatTooltip(data[targetItem.point][targetItem.series])}
        />
      </div>
    </div>
  );
};
const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label sx={{ whiteSpace: 'nowrap' }} {...props} />
);

const TitleText = props => (
  <Title.Text {...props} sx={{ marginBottom: '30px' }} />
);

const formatInfo = (target) => {
  if (!target) {
    return 'None';
  }
  const { series, point } = target;
  const value = data[point][series];
  const argument = data[point].year;
  return `${series} ${value} sales in ${argument}`;
};

const AuxiliaryButton = props => (
  <Button variant="outlined" {...props} />
);

const AuxiliarySelection = ({
  target, turnNext, turnPrev, clear,
}) => (
  <div>
    <StyledDiv className={classes.group}>
      <AuxiliaryButton onClick={turnPrev} sx={{ margin: 1 }}>
        <NavigateBefore />
      </AuxiliaryButton>
      <AuxiliaryButton onClick={clear} sx={{ margin: 1, width: '170px' }}>
        Clear Selection
      </AuxiliaryButton>
      <AuxiliaryButton onClick={turnNext} sx={{ margin: 1 }}>
        <NavigateNext />
      </AuxiliaryButton>
    </StyledDiv>
    <StyledDiv className={classes.text}>
      <Typography color="textSecondary" variant="body2" sx={{ ml: 1, mr: 1 }}>Selected:</Typography>
      <Typography>{formatInfo(target)}</Typography>
    </StyledDiv>
  </div>
);

const AuxiliaryHover = ({
  target, enabled, toggle,
}) => (
  <StyledDiv className={classes.hoverGroup}>
    <AuxiliaryButton onClick={toggle} sx={{ margin: 1, width: '170px' }}>
      {enabled ? 'Disable tooltip' : 'Enable tooltip'}
    </AuxiliaryButton>
    <StyledDiv className={classes.text}>
      <Typography color="textSecondary" variant="body2" sx={{ ml: 1, mr: 1 }}>Hovered:</Typography>
      <Typography>{formatInfo(target)}</Typography>
    </StyledDiv>
  </StyledDiv>
);

const encodeTarget = ({ series, point }) => (2 * point + Number(series === 'China'));
const decodeTarget = code => ({ series: code % 2 ? 'China' : 'USA', point: Math.floor(code / 2) });

const compareTargets = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hover: null,
      selection: [{ series: 'USA', point: 3 }],
      tooltipTarget: null,
      tooltipEnabled: true,
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compareTargets(selection[0], target) ? [] : [target],
        }));
      }
    };
    this.changeHover = hover => this.setState({ hover });
    this.changeTooltip = targetItem => this.setState({ tooltipTarget: targetItem });

    this.clearSelection = () => this.setState({ selection: [] });
    this.turnPrevSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.max(encodeTarget(target) - 1, 0));
      return { selection: [newTarget] };
    });
    this.turnNextSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.min(encodeTarget(target) + 1, 2 * data.length - 1));
      return { selection: [newTarget] };
    });

    this.toggleTooltip = () => this.setState(({ tooltipEnabled }) => ({
      tooltipEnabled: !tooltipEnabled,
      tooltipTarget: null,
    }));
  }

  render() {
    const {
      hover, selection, tooltipTarget, tooltipEnabled,
    } = this.state;

    return (
      <Paper>
        <Chart
          data={data}
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
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <EventTracker onClick={this.click} />
          <HoverState hover={hover} onHoverChange={this.changeHover} />
          <Tooltip
            targetItem={tooltipEnabled && tooltipTarget}
            onTargetItemChange={this.changeTooltip}
            contentComponent={TooltipContent}
          />
          <SelectionState selection={selection} />
          <Animation />
        </Chart>
        <StyledDiv className={classes.group}>
          <AuxiliaryHover
            target={hover}
            enabled={tooltipEnabled}
            toggle={this.toggleTooltip}
          />
          <AuxiliarySelection
            target={selection[0]}
            clear={this.clearSelection}
            turnPrev={this.turnPrevSelection}
            turnNext={this.turnNextSelection}
          />
        </StyledDiv>
      </Paper>
    );
  }
}
