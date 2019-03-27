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
  getAppointmentStyle,
  intervalDuration,
  autoScroll,
  calculateAppointmentTimeBoundaries,
  calculateInsidePart,
  calculateDraftAppointments,
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

    this.timeTableDraftAppointments = [];
    this.allDayDraftAppointments = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;
  }

  onDrop(actions) {
    return () => this.handleDrop(actions);
  }

  onPayloadChange(actions) {
    return args => this.handlePayloadChange(args, actions);
  }

  calculateNextBoundaries(getters, actions) {
    return args => this.calculateBoundaries(args, getters, actions);
  }

  resetCache() {
    this.timeTableDraftAppointments = [];
    this.allDayDraftAppointments = [];
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

  calculateBoundaries(
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
    const insidePart = calculateInsidePart(clientOffset.y, timeTableCells, timeTableIndex);
    const cellDurationMinutes = intervalDuration(targetData, 'minutes');

    const {
      appointmentStartTime, appointmentEndTime, offsetTimeTop,
    } = calculateAppointmentTimeBoundaries(
      payload, targetData, targetType, cellDurationMinutes,
      insidePart, this.offsetTimeTop,
    );
    this.appointmentStartTime = appointmentStartTime || this.appointmentStartTime;
    this.appointmentEndTime = appointmentEndTime || this.appointmentEndTime;
    this.offsetTimeTop = offsetTimeTop;

    const { startTime, endTime } = this.state;
    if (moment(startTime).isSame(this.appointmentStartTime)
      && moment(endTime).isSame(this.appointmentEndTime)) return;

    const draftAppointments = [{
      dataItem: {
        ...payload,
        startDate: this.appointmentStartTime,
        endDate: this.appointmentEndTime,
      },
      start: this.appointmentStartTime,
      end: this.appointmentEndTime,
    }];

    const {
      allDayDraftAppointments,
      timeTableDraftAppointments,
    } = calculateDraftAppointments(
      allDayIndex, draftAppointments, startViewDate,
      endViewDate, excludedDays, viewCellsData, allDayCells,
      targetType, cellDurationMinutes, timeTableCells,
    );
    this.allDayDraftAppointments = allDayDraftAppointments;
    this.timeTableDraftAppointments = timeTableDraftAppointments;

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
      resizeComponent: Resize,
      allowDrag,
      allowResize,
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
            }) => {
              const calculateBoundariesByMove = this.calculateNextBoundaries({
                viewCellsData,
                startViewDate,
                endViewDate,
                excludedDays,
                timeTableElement,
                layoutElement,
                layoutHeaderElement,
              }, { changeAppointment, startEditAppointment, stopEditAppointment });
              return (
                <DragDropProviderCore
                  onChange={this.onPayloadChange({ commitChangedAppointment, stopEditAppointment })}
                >
                  <DropTarget
                    onOver={calculateBoundariesByMove}
                    onEnter={calculateBoundariesByMove}
                    onDrop={this.onDrop({ commitChangedAppointment, stopEditAppointment })}
                  >
                    <TemplatePlaceholder />
                  </DropTarget>
                </DragDropProviderCore>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template
          name="appointmentContent"
          predicate={({ data }) => allowDrag(data)}
        >
          {({ style, ...params }) => (
            <DragSource
              payload={{ ...params.data, type: params.type }}
            >
              {payload && params.data.id === payload.id ? (
                <SourceAppointment {...params} />
              ) : (
                <TemplatePlaceholder params={{ ...params, draggable: true }} />
              )}
            </DragSource>
          )}
        </Template>

        <Template
          name="appointmentTop"
          predicate={params => !params.slice && allowResize(params.data)}
        >
          {({ data, type }) => (
            <DragSource
              payload={{ ...data, type: 'resize-top', appointmentType: type }}
            >
              <Resize position="top" appointmentType={type} />
            </DragSource>
          )}
        </Template>

        <Template
          name="appointmentBottom"
          predicate={params => !params.slice && allowResize(params.data)}
        >
          {({ data, type }) => (
            <DragSource
              payload={{ ...data, type: 'resize-bottom', appointmentType: type }}
            >
              <Resize position="bottom" appointmentType={type} />
            </DragSource>
          )}
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          {(this.allDayDraftAppointments.length > 0 ? (
            <Container>
              {this.allDayDraftAppointments.map(({
                dataItem, type, leftSlice, rightSlice, ...geometry
              }, index) => (
                <DraftAppointment
                  key={index.toString()}
                  data={draftData}
                  style={getAppointmentStyle(geometry)}
                  type={type}
                  leftSlice={leftSlice}
                  rightSlice={rightSlice}
                />
              ))}
            </Container>
          ) : (
            null
          ))}
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          {(this.timeTableDraftAppointments.length > 0 ? (
            <Container>
              {this.timeTableDraftAppointments.map(({
                dataItem, type, leftSlice, rightSlice, ...geometry
              }, index) => (
                <DraftAppointment
                  key={index.toString()}
                  data={draftData}
                  style={getAppointmentStyle(geometry)}
                  type={type}
                  leftSlice={leftSlice}
                  rightSlice={rightSlice}
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
  resizeComponent: PropTypes.func.isRequired,
  allowDrag: PropTypes.func,
  allowResize: PropTypes.func,
};

DragDropProvider.defaultProps = {
  allowDrag: () => true,
  allowResize: () => true,
};

DragDropProvider.components = {
  containerComponent: 'Container',
  draftAppointmentComponent: 'DraftAppointment',
  sourceAppointmentComponent: 'SourceAppointment',
  resizeComponent: 'Resize',
};
