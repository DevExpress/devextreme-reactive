import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  timeScale as timeScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
} from '@devexpress/dx-scheduler-core';

const SidebarPlaceholder = props => (
  <TemplatePlaceholder name="sidebar" params={props} />
);
const DayScalePlaceholder = props => (
  <TemplatePlaceholder name="navbar" params={props} />
);
const DateTablePlaceholder = props => (
  <TemplatePlaceholder name="main" params={props} />
);

export class DayView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      timePanelLayoutComponent: TimePanel,
      timePanelRowComponent: TimePanelRow,
      timePanelCellComponent: TimePanelCell,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      startDayHour,
      endDayHour,
      cellDuration,
      intervalCount,
    } = this.props;

    const timeScaleComputed = ({ currentDate }) => timeScaleCore(
      currentDate,
      0,
      startDayHour,
      endDayHour,
      cellDuration,
      [],
    );
    // const startViewDateComputed = (
    //   { dayScale, timeScale },
    // ) => startViewDateCore(dayScale, timeScale, startDayHour);
    // const endViewDateComputed = ({ dayScale, timeScale }) => endViewDateCore(dayScale, timeScale);

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="currentView" value="day" />
        <Getter name="intervalCount" value={intervalCount} />
        <Getter name="cellDuration" value={cellDuration} />
        <Getter name="timeScale" computed={timeScaleComputed} />

        <Template name="body">
          <ViewLayout
            navbarComponent={DayScalePlaceholder}
            mainComponent={DateTablePlaceholder}
            sidebarComponent={SidebarPlaceholder}
          />
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
        </Template>

        <Template name="sidebar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ timeScale }) => (
              <TimePanel
                rowComponent={TimePanelRow}
                cellComponent={TimePanelCell}
                timeScale={timeScale}
              />
            )}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ timeScale }) => (
              <DateTable
                rowComponent={DateTableRow}
                cellComponent={DateTableCell}
                timeScale={timeScale}
                dateTableRef={this.dateTableRef}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

DayView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  timePanelLayoutComponent: PropTypes.func.isRequired,
  timePanelRowComponent: PropTypes.func.isRequired,
  timePanelCellComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  intervalCount: PropTypes.number,
};

DayView.defaultProps = {
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
};
