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
      timeTableCells: [],
      allDayCells: [],
      payload: undefined,
      timeTableIndex: undefined,
    };

    this.onOver = this.handleOver.bind(this);
    this.onDrop = this.handleDrop.bind(this);
    this.onPayloadChange = this.onPayloadChange.bind(this);

    this.onOver2 = (getters, actions) => args => this.onOver(args, getters, actions);
    this.onDrop2 = action => args => this.onDrop(args, action);
    this.onPayloadChange2 = action => args => this.onPayloadChange(args, action);

    this.allDayCells = [];
    this.timeTableCells = [];

    this.timeTableIndex = null;
    this.allDayIndex = null;

    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.payload = null;

    this.timeTableRects = [];
  }

  onPayloadChange({ payload, clientOffset }, commitChangedAppointment) {
    // AUTO SCROLL
    if (clientOffset) {
      const [layout] = document.getElementsByClassName('dx-layout');
      this.layout = layout;
      this.layoutHeaderRect = document.getElementsByClassName('dx-layout-header')[0].getBoundingClientRect();

      if ((clientOffset.y - SCROLL_OFFSET < this.layoutHeaderRect.height + this.layoutHeaderRect.top) && (clientOffset.y > this.layoutHeaderRect.height + this.layoutHeaderRect.top)) {
        this.layout.scrollTop -= SCROLL_SPEED_PX;
      }
      if (this.layout.clientHeight - SCROLL_OFFSET < clientOffset.y - this.layout.offsetTop) {
        this.layout.scrollTop += SCROLL_SPEED_PX;
      }
    }

    if (payload) return;
    if (this.payload) {
      commitChangedAppointment({ appointmentId: this.payload.id });
      // RESET
      this.offsetTimeTop = null;
      this.offsetTimeBottom = null;
      this.part = 0;
    }
    this.setState({ payload });
  }

  handleOver(
    { payload, clientOffset },
    {
      viewCellsData, startViewDate, endViewDate, excludedDays,
    },
    { changeAppointment },
  ) {
    const timeTableCells = Array.from(document.getElementsByClassName('dx-time-table')[0].querySelectorAll('td'));
    const allDayCells = Array.from(document.querySelectorAll('th'));
    const timeTableIndex = timeTableCells.findIndex((timeTableCell) => {
      const {
        left,
        top,
        right,
        bottom,
      } = timeTableCell.getBoundingClientRect();
      const isOver = clientOffset
        && clamp(clientOffset.x, left, right) === clientOffset.x
        && clamp(clientOffset.y, top, bottom) === clientOffset.y;
      return isOver;
    });

    const allDayIndex = allDayCells.findIndex((timeTableCell) => {
      const {
        left,
        top,
        right,
        bottom,
      } = timeTableCell.getBoundingClientRect();
      const isOver = clientOffset
        && clamp(clientOffset.x, left, right) === clientOffset.x
        && clamp(clientOffset.y, top, bottom) === clientOffset.y;
      return isOver;
    });

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const appointmentDuration = moment(payload.endDate).diff(moment(payload.startDate), 'seconds');
    const targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    const targetType = moment(targetData.startDate).isSame(targetData.endDate, 'day')
      ? 'vertical' : 'horizontal';
    const sourceType = payload.type;

    // CALCULATE INSIDE OFFSET
    this.part = 0;
    if (timeTableIndex !== -1) {
      const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
      this.part = clientOffset.y > cellRect.top + (cellRect.bottom - cellRect.top) / 2 ? 1 : 0;
    }

    // CURSOR POSITION
    const divisionTime = 15 * 60;
    const insideOffset = targetType === 'vertical' ? this.part * divisionTime : 0;

    if (this.offsetTimeTop === null && this.offsetTimeBottom === null) {
      this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds') + insideOffset;
      this.offsetTimeBottom = moment(payload.endDate).diff(targetData.endDate, 'seconds');
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

    changeAppointment({
      change: {
        startDate: this.appointmentStartTime,
        endDate: this.appointmentEndTime,
      },
    });

    const draftAppointments = [{ ...payload, start: this.appointmentStartTime, end: this.appointmentEndTime }];

    if (allDayIndex !== -1) {
      this.allDayRects = allDayRects(draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, allDayCells);
    } else {
      this.allDayRects = [];
    }

    if (timeTableIndex !== -1 && allDayIndex === -1) {
      const cellDuration = moment(targetData.endDate).diff(targetData.startDate, 'minutes');
      if (targetType === 'vertical') {
        this.timeTableRects = verticalTimeTableRects(draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration, timeTableCells);
      } else {
        this.timeTableRects = horizontalTimeTableRects(draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, timeTableCells);
      }
    } else {
      this.timeTableRects = [];
    }

    this.timeTableIndex = timeTableIndex;
    this.allDayIndex = allDayIndex;
    this.payload = payload;

    this.setState({
      allDayIndex,
      timeTableIndex,
      payload,
      timeTableCells,
      allDayCells,
    });
  }

  handleDrop(args, commitChangedAppointment) {
    commitChangedAppointment({ appointmentId: this.payload.id });

    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.timeTableIndex = null;
    this.allDayIndex = null;

    this.payload = null;
    this.part = 0;

    this.setState({
      timeTableCells: [],
      allDayCells: [],
      payload: undefined,
      timeTableIndex: undefined,
      allDayIndex: undefined,
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
        <Template name="root">
          <TemplateConnector>
            {(getters, { commitChangedAppointment }) => (
              <DragDropProviderCore
                onChange={this.onPayloadChange2(commitChangedAppointment)}
              >
                <TemplatePlaceholder />
              </DragDropProviderCore>
            )}
          </TemplateConnector>
        </Template>

        <Template name="body">
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
            }, { commitChangedAppointment, changeAppointment }) => (
              <DropTarget
                onOver={this.onOver2(
                  {
                    viewCellsData, startViewDate, endViewDate, excludedDays,
                  },
                  { changeAppointment },
                )}
                onDrop={this.onDrop2(commitChangedAppointment)}
              >
                <TemplatePlaceholder />
              </DropTarget>
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
                  <TemplatePlaceholder {...params} />
                )}
              </DragSource>
            ) : (
              <TemplatePlaceholder {...params} />
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
                if (payload === undefined) return null;
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
