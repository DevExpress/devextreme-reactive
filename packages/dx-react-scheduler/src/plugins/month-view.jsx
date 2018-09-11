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
  endViewBoundary,
  monthAppointmentRect,
  dayScale as dayScaleCore,
  monthCells as monthCellsCore,
  availableViews as availableViewsCore,
} from '@devexpress/dx-scheduler-core';

const WEEK_COUNT = 7;

export class MonthView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);
    this.dayScalePlaceholder = params => <TemplatePlaceholder name="navbar" params={params} />;
    this.dateTablePlaceholder = params => <TemplatePlaceholder name="main" params={params} />;
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      dayPanelLayoutComponent: DayPanel,
      dayPanelCellComponent: DayPanelCell,
      dayPanelRowComponent: DayPanelRow,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      intervalCount,
      firstDayOfWeek,
      viewName,
    } = this.props;
    const { dateTableRef: stateDateTableRef } = this.state;

    const dayScaleComputed = ({ currentDate }) => dayScaleCore(
      currentDate, firstDayOfWeek, WEEK_COUNT, [],
    );
    const monthCellsComputed = ({ currentDate }) => monthCellsCore(
      currentDate, firstDayOfWeek, intervalCount,
    );
    const endViewDateComputed = ({ monthCells }) => endViewBoundary(monthCells);
    const startViewDateComputed = ({ monthCells }) => new Date(monthCells[0][0].value);

    const currentViewComputed = ({ currentView }) => {
      if (!currentView || viewName === currentView) {
        return viewName;
      }
      return currentView;
    };
    const dateTableRefComputed = ({ currentView, dateTableRef }) => {
      if (currentView === viewName) {
        return stateDateTableRef;
      } return dateTableRef;
    };
    const availableViewsComputed = ({ availableViews }) => availableViewsCore(
      availableViews, viewName,
    );
    const appointmentRectsComputed = ({
      appointments,
      startViewDate,
      endViewDate,
      monthCells,
      dateTableRef,
      appointmentRects,
      currentView,
    }) => {
      if (currentView !== viewName) return appointmentRects;
      return (dateTableRef ? monthAppointmentRect(
        appointments,
        startViewDate,
        endViewDate,
        monthCells,
        dateTableRef.querySelectorAll('td'),
      ) : []);
    };

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViews" computed={availableViewsComputed} />
        <Getter name="currentView" computed={currentViewComputed} />
        <Getter name="dateTableRef" computed={dateTableRefComputed} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="intervalCount" value={intervalCount} />
        <Getter name="dayScale" computed={dayScaleComputed} />
        <Getter name="monthCells" computed={monthCellsComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />
        <Getter name="appointmentRects" computed={appointmentRectsComputed} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  navbarComponent={this.dayScalePlaceholder}
                  mainComponent={this.dateTablePlaceholder}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplateConnector>
            {({ dayScale, currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <DayPanel
                  cellComponent={DayPanelCell}
                  rowComponent={DayPanelRow}
                  dayScale={dayScale}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="sidebar" />
        <Template name="main">
          <TemplateConnector>
            {({ monthCells, currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <DateTable
                  rowComponent={DateTableRow}
                  cellComponent={DateTableCell}
                  monthCells={monthCells}
                  dateTableRef={this.dateTableRef}
                />
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

MonthView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  dayPanelLayoutComponent: PropTypes.func.isRequired,
  dayPanelCellComponent: PropTypes.func.isRequired,
  dayPanelRowComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  intervalCount: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
  viewName: PropTypes.string,
};

MonthView.defaultProps = {
  intervalCount: 1,
  firstDayOfWeek: 0,
  viewName: 'Month',
};
