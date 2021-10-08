import * as React from 'react';
import {
  Plugin, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
  PluginComponents, PlaceholderWithRef,
} from '@devexpress/dx-react-core';
import {
  cellIndex, cellData, cellType, getAppointmentStyle, intervalDuration, autoScroll,
  calculateAppointmentTimeBoundaries, calculateInsidePart, RESIZE_TOP, RESIZE_BOTTOM,
  POSITION_START, POSITION_END, getAppointmentResources, calculateAppointmentGroups,
  appointmentDragged, calculateDraftAppointments,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION, SCROLL_SPEED_PX,
} from '@devexpress/dx-scheduler-core';
import { DragDropProviderProps, DragDropProviderState } from '../types';

const renderAppointmentItems = (items, Wrapper, draftData) => (
  items.length > 0 ? (
    <Wrapper>
      {items.map((draftAppointment, index) => (
        <TemplatePlaceholder
          name="draftAppointment"
          key={index.toString()}
          params={{ data: draftData, draftAppointment }}
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
  appointmentGroupingInfo: any = {};

  state: DragDropProviderState = {
    startTime: null,
    endTime: null,
    appointmentGroupingInfo: null,
    payload: null,
    isOutside: false,
    allowDrag: () => true,
    allowResize: () => true,
    appointmentContentTemplateKey: 0,
    appointmentTopTemplateKey: 0,
    appointmentBottomTemplateKey: 0,
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
    scrollSpeed: SCROLL_SPEED_PX,
  };
  static getDerivedStateFromProps(
    props: DragDropProviderProps, state: DragDropProviderState,
  ): DragDropProviderState | null {
    const isAllowDragSame = props.allowDrag === state.allowDrag;
    const isAllowResizeSame = props.allowResize === state.allowResize;

    if (isAllowDragSame && isAllowResizeSame) {
      return null;
    }

    return {
      ...state,
      appointmentContentTemplateKey:
        isAllowDragSame ? state.appointmentContentTemplateKey : Math.random(),
      appointmentTopTemplateKey:
        isAllowResizeSame ? state.appointmentTopTemplateKey : Math.random(),
      appointmentBottomTemplateKey:
        isAllowResizeSame ? state.appointmentBottomTemplateKey : Math.random(),
      allowDrag: props.allowDrag,
      allowResize: props.allowResize,
    };

  }

  onPayloadChange(actions) {
    return args => this.handlePayloadChange(args, actions);
  }

  calculateNextBoundaries(getters, actions, scrollSpeed) {
    return args => this.calculateBoundaries(args, getters, actions, scrollSpeed);
  }

  resetCache() {
    this.timeTableDraftAppointments = [];
    this.allDayDraftAppointments = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;
    this.appointmentGroupingInfo = {};

    this.setState({
      payload: null,
      startTime: null,
      endTime: null,
      isOutside: false,
    });
  }

  applyChanges(
    startTime, endTime, payload, startEditAppointment, changeAppointment, appointmentGroupingInfo,
  ) {
    startEditAppointment(payload);
    changeAppointment({
      change: {
        startDate: startTime,
        endDate: endTime,
        ...payload.allDay && { allDay: undefined },
        ...this.appointmentGroupingInfo,
      },
    });
    this.setState({ startTime, endTime, payload, isOutside: false, appointmentGroupingInfo });
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
      viewCellsData, allDayCellsData, startViewDate, endViewDate, excludedDays, currentView,
      timeTableElementsMeta, allDayElementsMeta, scrollingStrategy,
      grouping, resources, groups, groupOrientation: getGroupOrientation, groupByDate,
    },
    { changeAppointment, startEditAppointment },
    scrollSpeed,
  ) {
    if (clientOffset) {
      autoScroll(clientOffset, scrollingStrategy, scrollSpeed);
    }

    const tableCellElementsMeta = timeTableElementsMeta;
    const groupOrientation = getGroupOrientation
      ? getGroupOrientation(currentView?.name)
      : HORIZONTAL_GROUP_ORIENTATION;

    // AllDayPanel doesn't always exist
    const allDayCellsElementsMeta = allDayElementsMeta && allDayElementsMeta.getCellRects
      ? allDayElementsMeta
      : { getCellRects: [] };
    const timeTableIndex = cellIndex(tableCellElementsMeta.getCellRects, clientOffset);
    const allDayIndex = cellIndex(allDayCellsElementsMeta.getCellRects, clientOffset);

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const targetData = cellData(
      timeTableIndex, allDayIndex, viewCellsData, allDayCellsData,
    );
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

    const appointmentGroups = calculateAppointmentGroups(
      targetData.groupingInfo, resources, payload,
    );

    this.appointmentStartTime = appointmentStartTime || this.appointmentStartTime;
    this.appointmentEndTime = appointmentEndTime || this.appointmentEndTime;
    this.appointmentGroupingInfo = appointmentGroups || this.appointmentGroupingInfo;
    this.offsetTimeTop = offsetTimeTop!;

    const { startTime, endTime, appointmentGroupingInfo } = this.state;
    if (!appointmentDragged(
      this.appointmentStartTime, startTime!,
      this.appointmentEndTime, endTime!,
      this.appointmentGroupingInfo, appointmentGroupingInfo,
    )) {
      return;
    }

    const draftAppointments = [{
      dataItem: {
        ...payload,
        startDate: this.appointmentStartTime,
        endDate: this.appointmentEndTime,
        ...this.appointmentGroupingInfo,
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
      targetType, cellDurationMinutes, tableCellElementsMeta, grouping, resources, groups,
      groupOrientation, groupByDate?.(currentView?.name),
    );

    this.allDayDraftAppointments = allDayDraftAppointments;
    this.timeTableDraftAppointments = timeTableDraftAppointments;

    this.applyChanges(
      this.appointmentStartTime, this.appointmentEndTime,
      payload, startEditAppointment, changeAppointment,
      this.appointmentGroupingInfo,
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
    const {
      payload, appointmentContentTemplateKey,
      appointmentBottomTemplateKey, appointmentTopTemplateKey,
    } = this.state;
    const {
      containerComponent: Container,
      draftAppointmentComponent: DraftAppointment,
      sourceAppointmentComponent: SourceAppointment,
      resizeComponent: Resize,
      allowDrag,
      allowResize,
      scrollSpeed,
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
              viewCellsData, allDayCellsData, startViewDate, endViewDate, excludedDays,
              timeTableElementsMeta, allDayElementsMeta, scrollingStrategy,
              grouping, resources, groups, currentView, groupByDate, groupOrientation,
            }, {
              changeAppointment, startEditAppointment, finishCommitAppointment,
            }) => {
              const calculateBoundariesByMove = this.calculateNextBoundaries({
                viewCellsData, allDayCellsData, currentView,
                startViewDate, endViewDate, excludedDays,
                timeTableElementsMeta, allDayElementsMeta, scrollingStrategy,
                resources, grouping, groups, groupByDate, groupOrientation,
              }, { changeAppointment, startEditAppointment }, scrollSpeed);
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
                    <PlaceholderWithRef />
                  </DropTarget>
                </DragDropProviderCore>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template
          name="appointmentContent"
          predicate={({ data }: any) => allowDrag!(data)}
          key={appointmentContentTemplateKey}
        >
          {({ styles, ...params }: any) => (
            <DragSource
              payload={{ ...params.data, type: params.type }}
            >
              {payload && params.data.id === payload.id ? (
                <SourceAppointment {...params} />
              ) : (
                <PlaceholderWithRef params={{ ...params, draggable: true }} />
              )}
            </DragSource>
          )}
        </Template>

        <Template
          name="appointmentTop"
          predicate={(params: any) => !params.slice && allowResize!(params.data)}
          key={appointmentTopTemplateKey}
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
          key={appointmentBottomTemplateKey}
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
          <TemplateConnector>
            {({ currentView, groupOrientation }) => (
              <>
                <TemplatePlaceholder />
                {groupOrientation?.(currentView.name) !== VERTICAL_GROUP_ORIENTATION
                  ? renderAppointmentItems(this.allDayDraftAppointments, Container, draftData)
                  : null}
              </>
            )}
          </TemplateConnector>
        </Template>

        <Template name="timeTable">
          <TemplateConnector>
            {({ currentView, groupOrientation }) => (
              <>
                <TemplatePlaceholder />
                {renderAppointmentItems(this.timeTableDraftAppointments, Container, draftData)}
                {groupOrientation?.(currentView.name) === VERTICAL_GROUP_ORIENTATION
                  ? renderAppointmentItems(this.allDayDraftAppointments, Container, draftData)
                  : null}
              </>
            )}
          </TemplateConnector>
        </Template>

        <Template name="draftAppointment">
          {({ data, draftAppointment, ...restParams }: any) => (
            <TemplateConnector>
              {({ formatDate, resources, plainResources }) => {
                const {
                  dataItem, type, fromPrev, toNext, durationType, ...geometry
                } = draftAppointment;
                return (
                  <DraftAppointment
                    data={data}
                    resources={getAppointmentResources(dataItem, resources, plainResources)}
                    durationType={durationType}
                    style={getAppointmentStyle(geometry)}
                    type={type}
                    fromPrev={fromPrev}
                    toNext={toNext}
                    formatDate={formatDate}
                    {...restParams}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that enables users to edit appointments via drag-and-drop. */
export const DragDropProvider: React.ComponentType<DragDropProviderProps> = DragDropProviderBase;
