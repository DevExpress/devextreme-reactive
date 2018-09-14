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
  dayAppointmentRects,
  timeScale as timeScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
} from '@devexpress/dx-scheduler-core';

const appointmentRectsComputed = ({
  appointments,
  startViewDate,
  endViewDate,
  timeScale,
  currentDate,
  cellDuration,
  dateTableRef,
}) => (dateTableRef ? dayAppointmentRects(
  appointments,
  startViewDate,
  endViewDate,
  timeScale,
  currentDate,
  cellDuration,
  dateTableRef.querySelectorAll('td'),
) : []);

export class DayView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);

    this.sidebarPlaceholder = () => (
      <TemplatePlaceholder name="sidebar" />
    );
    this.dayScalePlaceholder = () => (
      <TemplatePlaceholder name="navbar" />
    );
    this.navbarEmptyPlaceholder = () => (
      <TemplatePlaceholder name="navbarEmpty" />
    );
    this.dateTablePlaceholder = () => (
      <TemplatePlaceholder name="main" />
    );
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      navbarEmptyComponent: NavbarEmpty,
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
    const { dateTableRef } = this.state;

    const timeScaleComputed = ({ currentDate }) => timeScaleCore(
      currentDate,
      0,
      startDayHour,
      endDayHour,
      cellDuration,
      [],
    );
    const startViewDateComputed = (
      { currentDate, timeScale },
    ) => startViewDateCore([currentDate], timeScale);
    const endViewDateComputed = (
      { currentDate, timeScale },
    ) => endViewDateCore([currentDate], timeScale);

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="currentView" value="day" />
        <Getter name="intervalCount" value={intervalCount} />
        <Getter name="cellDuration" value={cellDuration} />
        <Getter name="timeScale" computed={timeScaleComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />
        {dateTableRef && <Getter name="dateTableRef" value={dateTableRef} />}
        <Getter name="appointmentRects" computed={appointmentRectsComputed} />

        <Template name="body">
          <ViewLayout
            navbarComponent={this.dayScalePlaceholder}
            mainComponent={this.dateTablePlaceholder}
            navbarEmptyComponent={this.navbarEmptyPlaceholder}
            sidebarComponent={this.sidebarPlaceholder}
          />
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
        </Template>
        <Template name="navbarEmpty">
          <NavbarEmpty />
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
  navbarEmptyComponent: PropTypes.func.isRequired,
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
