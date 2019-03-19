import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import {
  Plugin, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import {
  cellIndex,
  cellData,
  cellType,
  allDayRects,
  verticalTimeTableRects,
  horizontalTimeTableRects,
  getAppointmentStyle,
  intervalDuration,
  VERTICAL_TYPE,
  autoScroll,
  calculateAppointmentTimeBoundaries,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Appointments' },
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'AllDayPanel', optional: true },
];

export class DragDropProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      payload: undefined,
    };

    this.timeTableRects = [];
    this.allDayRects = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;
  }

  onOver(getters, actions) {
    return args => this.handleOver(args, getters, actions);
  }

  onDrop(actions) {
    return () => this.handleDrop(actions);
  }

  onPayloadChange(actions) {
    return args => this.handlePayloadChange(args, actions);
  }

  resetCache() {
    this.timeTableRects = [];
    this.allDayRects = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;

    this.setState({
      payload: null,
      startTime: null,
      endTime: null,
    });
  }

  applyChanges(startTime, endTime, payload, startEditAppointment, changeAppointment) {
    startEditAppointment({ appointmentId: payload.id });
    changeAppointment({ change: { startDate: startTime, endDate: endTime } });
    this.setState({ startTime, endTime, payload });
  }

  handlePayloadChange({ payload }, { commitChangedAppointment, stopEditAppointment }) {
    if (payload) return;

    const { payload: prevPayload } = this.state;

    stopEditAppointment({ appointmentId: prevPayload.id });
    commitChangedAppointment({ appointmentId: prevPayload.id });
    this.resetCache();
  }

  handleOver(
    { payload, clientOffset },
    {
      viewCellsData, startViewDate, endViewDate, excludedDays,
      timeTableElement, layoutElement, layoutHeaderElement,
    },
    { changeAppointment, startEditAppointment },
  ) {
    if (clientOffset) {
      autoScroll(clientOffset, layoutElement, layoutHeaderElement);
    }

    const timeTableCells = Array.from(timeTableElement.current.querySelectorAll('td'));
    const allDayCells = Array.from(layoutHeaderElement.current.querySelectorAll('th'));

    const timeTableIndex = cellIndex(timeTableCells, clientOffset);
    const allDayIndex = cellIndex(allDayCells, clientOffset);

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    const targetType = cellType(targetData);

    // CALCULATE INSIDE OFFSET
    let insidePart = 0;
    if (timeTableIndex !== -1) {
      const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
      insidePart = clientOffset.y > cellRect.top + (cellRect.bottom - cellRect.top) / 2 ? 1 : 0;
    }

    const cellDurationMinutes = intervalDuration(targetData, 'minutes');
    const {
      appointmentStartTime, appointmentEndTime, offsetTimeTop,
    } = calculateAppointmentTimeBoundaries(
      payload, targetData, targetType, cellDurationMinutes,
      insidePart, this.offsetTimeTop,
    );
    this.appointmentStartTime = appointmentStartTime;
    this.appointmentEndTime = appointmentEndTime;
    this.offsetTimeTop = offsetTimeTop;

    const { startTime, endTime } = this.state;
    if (moment(startTime).isSame(this.appointmentStartTime)
      && moment(endTime).isSame(this.appointmentEndTime)) return;

    const draftAppointments = [{
      ...payload, start: this.appointmentStartTime, end: this.appointmentEndTime,
    }];

    if (allDayIndex !== -1) {
      this.allDayRects = allDayRects(
        draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, allDayCells,
      );
    } else {
      this.allDayRects = [];
    }

    if (timeTableIndex !== -1 && allDayIndex === -1) {
      if (targetType === VERTICAL_TYPE) {
        this.timeTableRects = verticalTimeTableRects(
          draftAppointments, startViewDate, endViewDate,
          excludedDays, viewCellsData, cellDurationMinutes, timeTableCells,
        );
      } else {
        this.timeTableRects = horizontalTimeTableRects(
          draftAppointments, startViewDate, endViewDate,
          excludedDays, viewCellsData, timeTableCells,
        );
      }
    } else {
      this.timeTableRects = [];
    }

    this.applyChanges(
      this.appointmentStartTime, this.appointmentEndTime,
      payload, startEditAppointment, changeAppointment,
    );
  }

  handleDrop({ commitChangedAppointment, stopEditAppointment }) {
    const { payload } = this.state;
    stopEditAppointment({ appointmentId: payload.id });
    commitChangedAppointment({ appointmentId: payload.id });
    this.resetCache();
  }

  render() {
    const { payload } = this.state;
    const {
      containerComponent: Container,
      draftAppointmentComponent: DraftAppointment,
      sourceAppointmentComponent: SourceAppointment,
      allowDrag,
    } = this.props;

    const draftData = {
      ...payload, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime,
    };

    return (
      <Plugin
        name="DragDropProvider"
        dependencies={pluginDependencies}
      >
        <Template name="body">
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
              timeTableElement, layoutElement, layoutHeaderElement,
            }, {
              commitChangedAppointment, changeAppointment,
              startEditAppointment, stopEditAppointment,
            }) => (
              <DragDropProviderCore
                onChange={this.onPayloadChange({ commitChangedAppointment, stopEditAppointment })}
              >
                <DropTarget
                  onOver={this.onOver({
                    viewCellsData,
                    startViewDate,
                    endViewDate,
                    excludedDays,
                    timeTableElement,
                    layoutElement,
                    layoutHeaderElement,
                  }, { changeAppointment, startEditAppointment, stopEditAppointment })}
                  onDrop={this.onDrop({ commitChangedAppointment, stopEditAppointment })}
                >
                  <TemplatePlaceholder />
                </DropTarget>
              </DragDropProviderCore>
            )}
          </TemplateConnector>
        </Template>

        <Template
          name="appointment"
          predicate={({ data }) => allowDrag(data)}
        >
          {params => (
            <DragSource
              payload={{ ...params.data, type: params.type }}
            >
              {payload && params.data.id === payload.id ? (
                <SourceAppointment {...params} />
              ) : (
                <TemplatePlaceholder params={{ ...params, draggable: true }} />
              )}
            </DragSource>
          )
          }
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          {(this.allDayRects.length > 0 ? (
            <Container>
              {this.allDayRects.map(({
                dataItem, type, ...geometry
              }, index) => (
                <DraftAppointment
                  key={index.toString()}
                  data={draftData}
                  style={getAppointmentStyle(geometry)}
                  type={type}
                />
              ))}
            </Container>
          ) : (
            null
          ))}
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          {(this.timeTableRects.length > 0 ? (
            <Container>
              {this.timeTableRects.map(({
                dataItem, type, ...geometry
              }, index) => (
                <DraftAppointment
                  key={index.toString()}
                  data={draftData}
                  style={getAppointmentStyle(geometry)}
                  type={type}
                />
              ))}
            </Container>
          ) : (
            null
          ))}
        </Template>
      </Plugin>
    );
  }
}

DragDropProvider.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  draftAppointmentComponent: PropTypes.func.isRequired,
  sourceAppointmentComponent: PropTypes.func.isRequired,
  allowDrag: PropTypes.func,
};

DragDropProvider.defaultProps = {
  allowDrag: () => true,
};

DragDropProvider.components = {
  containerComponent: 'Container',
  draftAppointmentComponent: 'DraftAppointment',
  sourceAppointmentComponent: 'SourceAppointment',
};
