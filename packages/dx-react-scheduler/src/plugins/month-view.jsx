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

const DayScalePlaceholder = props => (
  <TemplatePlaceholder name="navbar" params={props} />
);
const DateTablePlaceholder = props => (
  <TemplatePlaceholder name="main" params={props} />
);

export class MonthView extends React.PureComponent {
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
      dayPanelLayoutComponent: DayPanel,
      dayPanelTableComponent: DayScaleTable,
      dayPanelCellComponent: DayScaleCell,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      intervalCount,
      firstDayOfWeek,
    } = this.props;

    const dayScaleComputed = ({ currentDate }) =>
      dayScaleCore(currentDate, firstDayOfWeek, intervalCount * 7, []);
    const startViewDateComputed = ({ monthCells }) =>
      new Date(monthCells[0][0].value);
    const endViewDateComputed = ({ monthCells }) =>
      new Date(new Date(monthCells[5][6].value).setDate(monthCells[5][6].value.getDate() + 1));

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="dayScale" computed={dayScaleComputed} />
        <Getter name="monthCells" computed={monthCellsComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />
        {this.state.dateTableRef && <Getter name="dateTableRef" value={this.state.dateTableRef} />}
        <Getter name="appointmentRects" computed={appointmentRectsComputed} />

        <Template name="body">
          <ViewLayout
            navbarComponent={DayScalePlaceholder}
            mainComponent={DateTablePlaceholder}
          />
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
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

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ monthCells }) => (
              <DateTable
                rowComponent={DateTableRow}
                cellComponent={DateTableCell}
                monthCells={monthCells}
                dateTableRef={this.dateTableRef}
              />
            )}
          </TemplateConnector>
        </Template>
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
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  intervalCount: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
};

MonthView.defaultProps = {
  intervalCount: 1,
  firstDayOfWeek: 0,
};
