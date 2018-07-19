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
  monthAppointmentRect,
  dayScale as dayScaleCore,
  monthCells as monthCellsCore,
  availableViews as availableViewsCore,
} from '@devexpress/dx-scheduler-core';

const appointmentRectsComputed = ({
  appointments,
  startViewDate,
  endViewDate,
  monthCells,
  dateTableRef,
}) => (dateTableRef ? monthAppointmentRect(
  appointments,
  startViewDate,
  endViewDate,
  monthCells,
  dateTableRef.querySelectorAll('td'),
) : []);

const monthCellsComputed = ({ currentDate, firstDayOfWeek }) =>
  monthCellsCore(currentDate, firstDayOfWeek);

export class MonthView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);
    this.dayScalePlaceholder = params =>
      <TemplatePlaceholder name="navbar" params={params} />;
    this.dateTablePlaceholder = params =>
      <TemplatePlaceholder name="main" params={params} />;
  }
  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }
  render() {
    const {
      layoutComponent: ViewLayout,
      dayPanelLayoutComponent: DayPanel,
      dayPanelTableComponent: DayScaleTable,
      dayPanelCellComponent: DayScaleCell,
      dateTableLayoutComponent: DateTable,
      dateTableTableComponent: DateTableTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      intervalCount,
      firstDayOfWeek,
      viewName,
    } = this.props;

    const currentViewComputed = ({ currentView }) => {
      if (!currentView || viewName === currentView) {
        return viewName;
      }
      return currentView;
    };
    const dayScaleComputed = ({ currentDate }) =>
      dayScaleCore(currentDate, firstDayOfWeek, intervalCount * 7, []);
    const startViewDateComputed = ({ monthCells }) =>
      new Date(monthCells[0][0].value);
    const endViewDateComputed = ({ monthCells }) =>
      new Date(new Date(monthCells[5][6].value).setDate(monthCells[5][6].value.getDate() + 1));
    const dateTableRefComputed = ({ currentView, dateTableRef }) => {
      if (currentView === viewName) {
        return this.state.dateTableRef;
      } return dateTableRef;
    };
    const availableViewsComputed = ({ availableViews }) =>
      availableViewsCore(availableViews, viewName);

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViews" computed={availableViewsComputed} />
        <Getter name="currentView" computed={currentViewComputed} />
        <Getter name="dateTableRef" computed={dateTableRefComputed} />
        <TemplateConnector>
          {({ currentView }) => {
            if (currentView !== viewName) return null;
              return (
                <React.Fragment>
                  <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
                  <Getter name="dayScale" computed={dayScaleComputed} />
                  <Getter name="monthCells" computed={monthCellsComputed} />
                  <Getter name="startViewDate" computed={startViewDateComputed} />
                  <Getter name="endViewDate" computed={endViewDateComputed} />
                  <Getter name="appointmentRects" computed={appointmentRectsComputed} />

                  <Template name="body">
                    <ViewLayout
                      navbarComponent={this.dayScalePlaceholder}
                      mainComponent={this.dateTablePlaceholder}
                    />
                  </Template>

                  <Template name="navbar">
                    <TemplateConnector>
                      {({ dayScale }) => (
                        <DayPanel
                          cellComponent={DayScaleCell}
                          rowComponent={DateTableRow}
                          tableComponent={DayScaleTable}
                          dayScale={dayScale}
                        />
                      )}
                    </TemplateConnector>
                  </Template>
                  <Template name="sidebar" />
                  <Template name="main">
                    <TemplateConnector>
                      {({ monthCells }) => (
                        <DateTable
                          rowComponent={DateTableRow}
                          cellComponent={DateTableCell}
                          tableComponent={DateTableTable}
                          monthCells={monthCells}
                          dateTableRef={this.dateTableRef}
                        />
                      )}
                    </TemplateConnector>
                  </Template>
                </React.Fragment>
              );
          }}
        </TemplateConnector>
      </Plugin>
    );
  }
}

MonthView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  dayPanelLayoutComponent: PropTypes.func.isRequired,
  dayPanelTableComponent: PropTypes.func.isRequired,
  dayPanelCellComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableTableComponent: PropTypes.func.isRequired,
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
