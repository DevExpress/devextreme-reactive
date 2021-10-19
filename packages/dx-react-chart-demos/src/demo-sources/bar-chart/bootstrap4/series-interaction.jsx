import * as React from 'react';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-bootstrap4';
import * as d3Format from 'd3-format';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  ArgumentScale, Stack, Animation, EventTracker, HoverState, SelectionState,
} from '@devexpress/dx-react-chart';
import classNames from 'clsx';

import { annualVehiclesSales as data } from '../../../demo-data/data-vizualization';

const tooltipContentTitleStyle = {
  fontWeight: 'bold',
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
          text={formatTooltip(data[targetItem.point][targetItem.series])}
        />
      </div>
    </div>
  );
};
const Root = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const TitleText = props => <Title.Text {...props} className="mb-4" />;

const formatInfo = (target) => {
  if (!target) {
    return 'None';
  }
  const { series, point } = target;
  const value = data[point][series];
  const argument = data[point].year;
  return `${series} ${value} sales in ${argument}`;
};

const auxiliaryRootStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};
const hoverGroupStyle = { width: '300px' };
const textStyle = { fontSize: '14px' };
const buttonsStyle = { width: '170px' };
const iconStyle = { top: '3px' };

const AuxiliaryName = props => <span className="font-weight-light mx-2" style={textStyle} {...props} />;
const AuxiliaryData = props => <span {...props} />;
const AuxiliaryButton = ({ className, ...restProps }) => <button type="button" className={classNames('m-2', className)} {...restProps} />;
const AuxiliaryIcon = ({ className, ...restProps }) => <span className={classNames('mx-2', className)} style={iconStyle} {...restProps} />;

const AuxiliarySelection = ({
  target, turnNext, turnPrev, clear,
}) => (
  <div>
    <div>
      <AuxiliaryButton onClick={turnPrev} className="btn btn-outline-primary">
        <AuxiliaryIcon className="oi oi-caret-left" />
      </AuxiliaryButton>
      <AuxiliaryButton onClick={clear} className="btn btn-outline-primary" style={buttonsStyle}>
        Clear Selection
      </AuxiliaryButton>
      <AuxiliaryButton onClick={turnNext} className="btn btn-outline-primary">
        <AuxiliaryIcon className="oi oi-caret-right" />
      </AuxiliaryButton>
    </div>
    <AuxiliaryName>Selected: </AuxiliaryName>
    <AuxiliaryData>{formatInfo(target)}</AuxiliaryData>
  </div>
);

const AuxiliaryHover = ({ target, enabled, toggle }) => (
  <div style={hoverGroupStyle}>
    <div>
      <AuxiliaryButton onClick={toggle} className="btn btn-outline-primary" style={buttonsStyle}>
        {enabled ? 'Disable tooltip' : 'Enable tooltip'}
      </AuxiliaryButton>
    </div>
    <AuxiliaryName>Hovered: </AuxiliaryName>
    <AuxiliaryData>{formatInfo(target)}</AuxiliaryData>
  </div>
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
      <div className="card">
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
          <Legend position="bottom" rootComponent={Root} />
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
        <div style={auxiliaryRootStyle}>
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
        </div>
      </div>
    );
  }
}
