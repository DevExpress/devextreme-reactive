/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import {
  Plugin, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import {
  allDayCells as allDayCellsCore,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getVerticalRectByDates,
  getAppointmentStyle,
  getHorizontalRectByDates,
  calculateMonthDateIntervals,
  calculateAllDayDateIntervals,
} from '@devexpress/dx-scheduler-core';

const SCROLL_OFFSET = 50;
const SCROLL_SPEED_PX = 30;

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const tableIndex = (timeTableCells, clientOffset) => timeTableCells.findIndex((timeTableCell) => {
  const {
    left, top,
    right, bottom,
  } = timeTableCell.getBoundingClientRect();
  const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;
  return isOver;
});

const cellData = (timeTableIndex, allDayIndex, viewCellsData) => {
  if (allDayIndex !== -1) {
    const allDayCellsData = allDayCellsCore(viewCellsData);
    return allDayCellsData[allDayIndex];
  }
  if (timeTableIndex !== -1) {
    const firstIndex = Math.floor(timeTableIndex / viewCellsData[0].length);
    const secondIndex = timeTableIndex % viewCellsData[0].length;
    return viewCellsData[firstIndex][secondIndex];
  }
};

const allDayRects = (draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellElements) => {
  const intervals = calculateAllDayDateIntervals(
    draftAppointments, startViewDate, endViewDate, excludedDays,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: 'horizontal',
      multiline: false,
    },
    intervals,
    getHorizontalRectByDates,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellElements,
      excludedDays,
    },
  );
};


const verticalTimeTableRects = (draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration, cellElements) => {
  const intervals = calculateWeekDateIntervals(
    draftAppointments, startViewDate, endViewDate, excludedDays,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: 'vertical',
      multiline: false,
    },
    intervals,
    getVerticalRectByDates,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellDuration,
      cellElements,
    },
  );
};

const horizontalTimeTableRects = (draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellElements) => {
  const intervals = calculateMonthDateIntervals(
    draftAppointments, startViewDate, endViewDate,
  );
  return calculateRectByDateIntervals(
    {
      growDirection: 'horizontal',
      multiline: true,
    },
    intervals,
    getHorizontalRectByDates,
    {
      startViewDate,
      endViewDate,
      viewCellsData,
      cellElements,
    },
  );
};

export class AppointmentDragging extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      payload: undefined,
    };


    this.onOver = (getters, actions) => args => this.handleOver.bind(this)(args, getters, actions);
    this.onDrop = action => () => this.handleDrop.bind(this)(action);
    this.onPayloadChange = action => args => this.onPayloadChange2.bind(this)(args, action);

    this.offsetTimeTop = null;
  }

  onPayloadChange2({ payload }, commitChangedAppointment) {
    if (payload) return;

    const { payload: prevPayload } = this.state;
    if (prevPayload) {
      commitChangedAppointment({ appointmentId: prevPayload.id });
      // RESET
      this.offsetTimeTop = null;
    }
    this.setState({ payload });
  }

  handleOver(
    { payload, clientOffset },
    {
      viewCellsData, startViewDate, endViewDate, excludedDays, timeTableElement, layoutElement, layoutHeaderElement,
    },
    { changeAppointment },
  ) {
    // AUTO SCROLL
    if (clientOffset) {
      const layout = layoutElement.current;
      const layoutHeaderRect = layoutHeaderElement.current.getBoundingClientRect();

      if ((clientOffset.y - SCROLL_OFFSET < layoutHeaderRect.height + layoutHeaderRect.top) && (clientOffset.y > layoutHeaderRect.height + layoutHeaderRect.top)) {
        layout.scrollTop -= SCROLL_SPEED_PX;
      }
      if (layout.clientHeight - SCROLL_OFFSET < clientOffset.y - layout.offsetTop) {
        layout.scrollTop += SCROLL_SPEED_PX;
      }
    }

    const timeTableCells = Array.from(timeTableElement.current.querySelectorAll('td'));
    const allDayCells = Array.from(document.querySelectorAll('th'));

    const timeTableIndex = tableIndex(timeTableCells, clientOffset);
    const allDayIndex = tableIndex(allDayCells, clientOffset);

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const appointmentDuration = moment(payload.endDate).diff(moment(payload.startDate), 'seconds');
    const targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    const targetType = moment(targetData.startDate).isSame(targetData.endDate, 'day')
      ? 'vertical' : 'horizontal';
    const sourceType = payload.type;

    // CALCULATE INSIDE OFFSET
    let insidePart = 0;
    if (timeTableIndex !== -1) {
      const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
      insidePart = clientOffset.y > cellRect.top + (cellRect.bottom - cellRect.top) / 2 ? 1 : 0;
    }

    // CURSOR POSITION
    const cellDuration = moment(targetData.endDate).diff(targetData.startDate, 'minutes');
    const insideOffset = targetType === 'vertical' ? insidePart * cellDuration * 60 / 2 : 0;

    if (this.offsetTimeTop === null) {
      this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds') + insideOffset;
    }

    const start = moment(targetData.startDate).add(insideOffset, 'seconds');
    const end = moment(start);

    if (sourceType === targetType) {
      this.appointmentStartTime = moment(start).add((this.offsetTimeTop) * (-1), 'seconds').toDate();
      this.appointmentEndTime = moment(end).add((appointmentDuration - this.offsetTimeTop), 'seconds').toDate();
    } else {
      this.appointmentStartTime = moment(targetData.startDate).add(insideOffset, 'seconds');
      this.appointmentEndTime = moment(targetData.endDate).add(insideOffset, 'seconds');
    }

    const draftAppointments = [{ ...payload, start: this.appointmentStartTime, end: this.appointmentEndTime }];

    if (allDayIndex !== -1) {
      this.allDayRects = allDayRects(draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, allDayCells);
    } else {
      this.allDayRects = [];
    }

    if (timeTableIndex !== -1 && allDayIndex === -1) {
      if (targetType === 'vertical') {
        this.timeTableRects = verticalTimeTableRects(draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration, timeTableCells);
      } else {
        this.timeTableRects = horizontalTimeTableRects(draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, timeTableCells);
      }
    } else {
      this.timeTableRects = [];
    }

    const { startTime, endTime } = this.state;
    if (startTime && moment(startTime).isSame(this.appointmentStartTime) && moment(endTime).isSame(this.appointmentEndTime)) return;

    changeAppointment({
      change: {
        startDate: this.appointmentStartTime,
        endDate: this.appointmentEndTime,
      },
    });

    this.setState({
      startTime: this.appointmentStartTime,
      endTime: this.appointmentEndTime,
      payload,
    });
  }

  handleDrop(commitChangedAppointment) {
    const { payload } = this.state;
    commitChangedAppointment({ appointmentId: payload.id });

    this.offsetTimeTop = null;

    this.setState({
      payload: undefined,
      startTime: null,
      endTime: null,
    });
  }

  render() {
    const {
      payload,
    } = this.state;
    const {
      containerComponent: Container,
      draftAppointmentComponent: DraftAppointment,
      draggingAppointmentComponent: DraggingAppointment,
      draggingPredicate,
    } = this.props;

    return (
      <Plugin
        name="AppointmentDragging"
      >
        <Template name="body">
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
              timeTableElement, layoutElement, layoutHeaderElement,
            }, { commitChangedAppointment, changeAppointment }) => (
              <DragDropProviderCore
                onChange={this.onPayloadChange(commitChangedAppointment)}
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
                  }, { changeAppointment })}
                  onDrop={this.onDrop(commitChangedAppointment)}
                >
                  <TemplatePlaceholder />
                </DropTarget>
              </DragDropProviderCore>
            )}
          </TemplateConnector>
        </Template>

        <Template name="appointment">
          {params => (
            draggingPredicate(params.data) ? (
              <DragSource
                payload={{ ...params.data, type: params.type }}
              >
                {payload && params.data.id === payload.id ? (
                  <DraggingAppointment {...params} />
                ) : (
                  <TemplatePlaceholder params={{ ...params, style: { ...params.style, cursor: 'pointer' } }} />
                )}
              </DragSource>
            ) : (
              <TemplatePlaceholder />
            )
          )}
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          {(payload ? (
            <Container>
              {this.allDayRects.map(({
                dataItem, type, ...geometry
              }, index) => {
                const rect = getAppointmentStyle(geometry);
                return (
                  <DraftAppointment
                    key={index.toString()}
                    data={{ ...payload, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime }}
                    rect={rect}
                  />
                );
              })}
            </Container>
          ) : (
            null
          ))}
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          {(payload ? (
            <Container>
              {this.timeTableRects.map(({
                dataItem, type, ...geometry
              }, index) => {
                const rect = getAppointmentStyle(geometry);
                return (
                  <DraftAppointment
                    key={index.toString()}
                    data={{ ...payload, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime }}
                    rect={rect}
                  />
                );
              })}
            </Container>
          ) : (
            null
          ))}
        </Template>
      </Plugin>
    );
  }
}

AppointmentDragging.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  draftAppointmentComponent: PropTypes.func.isRequired,
  draggingAppointmentComponent: PropTypes.func.isRequired,
  draggingPredicate: PropTypes.func,
};

AppointmentDragging.defaultProps = {
  draggingPredicate: () => true,
};

AppointmentDragging.components = {
  containerComponent: 'Container',
  draftAppointmentComponent: 'DraftAppointment',
  draggingAppointmentComponent: 'DraggingAppointment',
};
