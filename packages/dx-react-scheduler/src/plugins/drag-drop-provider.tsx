import * as React from 'react';
import moment from 'moment';
import {
  Plugin, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
  PluginComponents,
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
  RESIZE_TOP,
  RESIZE_BOTTOM,
  POSITION_START,
  POSITION_END,
} from '@devexpress/dx-scheduler-core';
import { DragDropProviderProps, DragDropProviderState } from '../types';

const renderAppointmentItems = (items, formatDate, data, Wrapper, Appointment) => (
  items.length > 0 ? (
    <Wrapper>
      {items.map(({
        dataItem, type, fromPrev, toNext, ...geometry
      }, index) => (
        <Appointment
          key={index.toString()}
          data={data}
          style={getAppointmentStyle(geometry)}
          type={type}
          fromPrev={fromPrev}
          toNext={toNext}
          formatDate={formatDate}
        />
      ))}
    </Wrapper>
  ) : (
    null
  )
);

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Appointments' },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true },
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'AllDayPanel', optional: true },
];

class DragDropProviderBase extends React.PureComponent<
  DragDropProviderProps, DragDropProviderState
> {
  timeTableDraftAppointments: any = [];
  allDayDraftAppointments: any = [];
  offsetTimeTop: number | null = null;
  appointmentStartTime: any = null;
  appointmentEndTime: any = null;

  state: DragDropProviderState = {
    startTime: null,
    endTime: null,
    payload: null,
    isOutside: false,
  };
  static components: PluginComponents = {
    containerComponent: 'Container',
    draftAppointmentComponent: 'DraftAppointment',
    sourceAppointmentComponent: 'SourceAppointment',
    resizeComponent: 'Resize',
  };
  static defaultProps: Partial<DragDropProviderProps> = {
    allowDrag: () => true,
    allowResize: () => true,
  };

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
      isOutside: false,
    });
  }

  applyChanges(startTime, endTime, payload, startEditAppointment, changeAppointment) {
    startEditAppointment(payload);
    changeAppointment({
      change: {
        startDate: startTime,
        endDate: endTime,
        ...payload.allDay && { allDay: undefined },
      },
    });
    this.setState({ startTime, endTime, payload, isOutside: false });
  }

  handlePayloadChange({ payload }, { finishCommitAppointment }) {
    const { isOutside } = this.state;
    if (payload || !isOutside) return;

    finishCommitAppointment();
    this.resetCache();
  }

  calculateBoundaries(
    { payload, clientOffset },
    {
      viewCellsData, startViewDate, endViewDate, excludedDays,
      timeTableElementsMeta, allDayElementsMeta, scrollingStrategy,
    },
    { changeAppointment, startEditAppointment },
  ) {
    if (clientOffset) {
      autoScroll(clientOffset, scrollingStrategy);
    }

    const tableCellElementsMeta = timeTableElementsMeta;

    // AllDayPanel doesn't always exist
    const allDayCellsElementsMeta = allDayElementsMeta && allDayElementsMeta.getCellRects
      ? allDayElementsMeta
      : { getCellRects: [] };
    const timeTableIndex = cellIndex(tableCellElementsMeta.getCellRects, clientOffset);
    const allDayIndex = cellIndex(allDayCellsElementsMeta.getCellRects, clientOffset);

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    const targetType = cellType(targetData);
    const insidePart = calculateInsidePart(
      clientOffset.y, tableCellElementsMeta.getCellRects, timeTableIndex,
    );
    const cellDurationMinutes = intervalDuration(targetData, 'minutes');

    const {
      appointmentStartTime, appointmentEndTime, offsetTimeTop,
    } = calculateAppointmentTimeBoundaries(
      payload, targetData, targetType, cellDurationMinutes,
      insidePart, this.offsetTimeTop!,
    );

    this.appointmentStartTime = appointmentStartTime || this.appointmentStartTime;
    this.appointmentEndTime = appointmentEndTime || this.appointmentEndTime;
    this.offsetTimeTop = offsetTimeTop!;

    const { startTime, endTime } = this.state;
    if (moment(startTime!).isSame(this.appointmentStartTime)
      && moment(endTime!).isSame(this.appointmentEndTime)) return;

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
      endViewDate, excludedDays, viewCellsData, allDayCellsElementsMeta,
      targetType, cellDurationMinutes, tableCellElementsMeta,
    );
    this.allDayDraftAppointments = allDayDraftAppointments;
    this.timeTableDraftAppointments = timeTableDraftAppointments;

    this.applyChanges(
      this.appointmentStartTime, this.appointmentEndTime,
      payload, startEditAppointment, changeAppointment,
    );
  }

  handleDrop = ({ finishCommitAppointment }) => () => {
    finishCommitAppointment();
    this.resetCache();
  }

  handleLeave = () => {
    this.setState({ isOutside: true });
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
              timeTableElementsMeta, allDayElementsMeta, scrollingStrategy,
            }, {
              changeAppointment, startEditAppointment, finishCommitAppointment,
            }) => {
              const calculateBoundariesByMove = this.calculateNextBoundaries({
                viewCellsData,
                startViewDate,
                endViewDate,
                excludedDays,
                timeTableElementsMeta,
                allDayElementsMeta,
                scrollingStrategy,
              }, { changeAppointment, startEditAppointment });
              return (
                <DragDropProviderCore
                  onChange={this.onPayloadChange({ finishCommitAppointment })}
                >
                  <DropTarget
                    onOver={calculateBoundariesByMove}
                    onEnter={calculateBoundariesByMove}
                    onDrop={this.handleDrop({ finishCommitAppointment })}
                    onLeave={this.handleLeave}
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
          predicate={({ data }: any) => allowDrag!(data)}
        >
          {({ styles, ...params }: any) => (
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
          predicate={(params: any) => !params.slice && allowResize!(params.data)}
        >
          {({ data, type }: any) => (
            <DragSource
              payload={{ ...data, type: RESIZE_TOP, appointmentType: type }}
            >
              <Resize position={POSITION_START} appointmentType={type} />
            </DragSource>
          )}
        </Template>

        <Template
          name="appointmentBottom"
          predicate={(params: any) => !params.slice && allowResize!(params.data)}
        >
          {({ data, type }: any) => (
            <DragSource
              payload={{ ...data, type: RESIZE_BOTTOM, appointmentType: type }}
            >
              <Resize position={POSITION_END} appointmentType={type} />
            </DragSource>
          )}
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ formatDate }) => renderAppointmentItems(
              this.allDayDraftAppointments, formatDate, draftData, Container, DraftAppointment,
            )}
          </TemplateConnector>
        </Template>

        <Template name="timeTable">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ formatDate }) => renderAppointmentItems(
              this.timeTableDraftAppointments, formatDate, draftData, Container, DraftAppointment,
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that enables users to edit appointments via drag-and-drop. */
export const DragDropProvider: React.ComponentType<DragDropProviderProps> = DragDropProviderBase;
