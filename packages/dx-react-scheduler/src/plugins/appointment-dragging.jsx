/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
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

// tslint:disable-next-line: max-line-length
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
    this.onLeave = this.handleLeave.bind(this);
    this.onDrop = this.handleDrop.bind(this);
    this.onPayloadChange = this.onPayloadChange.bind(this);

    this.onDrop2 = action => args => this.onDrop(args, action);
    this.onPayloadChange2 = action => args => this.onPayloadChange(args, action);

    this.allDayCells = [];
    this.timeTableCells = [];

    this.timeTableIndex = null;
    this.allDayIndex = null;

    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.payload = null;

    this.rects = [];
  }

  onPayloadChange({ payload, clientOffset }) {
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
    this.setState({ payload });
  }

  handleOver({ payload, clientOffset }) {
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

    this.part = 0;
    if (timeTableIndex !== -1) {
      const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
      this.part = clientOffset.y > cellRect.top + (cellRect.bottom - cellRect.top) / 2 ? 1 : 0;
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

  handleLeave() {
    // use cash for make draft appointments
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
      payload, timeTableCells, allDayCells,
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
          <DragDropProviderCore
            onChange={this.onPayloadChange}
          >
            <TemplatePlaceholder />
          </DragDropProviderCore>
        </Template>

        <Template name="body">
          <TemplateConnector>
            {(getters, { commitChangedAppointment }) => (
              <DropTarget
                onOver={this.onOver}
                onLeave={this.onLeave}
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
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
            }, { changeAppointment, commitChangedAppointment }) => {
              this.allDayRects = [];

              // DROP OUTSIDE THE TARGET
              if (!payload && this.payload) {
                commitChangedAppointment({ appointmentId: this.payload.id });
              }
              if (this.allDayIndex !== -1 && payload) {
                const allDayCellsData = allDayCellsCore(viewCellsData);
                const appointmentDuration = moment(payload.endDate).diff(moment(payload.startDate), 'seconds');
                const targetData = allDayCellsData[this.allDayIndex];
                const targetType = moment(targetData.startDate).isSame(targetData.endDate, 'day')
                  ? 'vertical' : 'horizontal';
                const sourceType = payload.type;

                // CURSOR POSITION
                if (this.offsetTimeTop === null && this.offsetTimeBottom === null) {
                  this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds');
                  this.offsetTimeBottom = moment(payload.endDate).diff(targetData.endDate, 'seconds');
                }

                /* SAME TYPES && All DAY */
                if (sourceType === targetType) {
                  this.appointmentStartTime = moment(targetData.startDate).add((this.offsetTimeTop) * (-1), 'seconds').toDate();
                  this.appointmentEndTime = moment(targetData.startDate).add((appointmentDuration - this.offsetTimeTop), 'seconds').toDate();
                } else { // DIFFERENT TYPES
                  this.appointmentStartTime = targetData.startDate;
                  this.appointmentEndTime = targetData.endDate;
                }


                changeAppointment({
                  change: {
                    startDate: this.appointmentStartTime,
                    endDate: this.appointmentEndTime,
                  },
                });

                const draftAppointments = [{ ...payload, start: this.appointmentStartTime, end: this.appointmentEndTime }];

                const intervals = calculateAllDayDateIntervals(
                  draftAppointments, startViewDate, endViewDate, excludedDays,
                );
                this.allDayRects = calculateRectByDateIntervals(
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
                    cellDuration: moment(targetData.endDate).diff(targetData.startDate, 'minutes'),
                    cellElements: allDayCells,
                    excludedDays,
                  },
                );
              }

              if (!payload) return null;
              return (
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
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
            }, { changeAppointment, commitChangedAppointment }) => {
              this.rects = [];

              // DROP OUTSIDE THE TARGET
              if (!payload && this.payload) {
                commitChangedAppointment({ appointmentId: this.payload.id });
              }
              if (this.timeTableIndex !== -1 && this.allDayIndex === -1 && payload) {
                const firstIndex = Math.floor(this.timeTableIndex / viewCellsData[0].length);
                const secondIndex = this.timeTableIndex % viewCellsData[0].length;

                if (firstIndex > -1 && secondIndex > -1) {
                  const targetData = viewCellsData[firstIndex][secondIndex];
                  const targetType = moment(targetData.startDate).isSame(targetData.endDate, 'day')
                    ? 'vertical' : 'horizontal';
                  const sourceType = payload.type;

                  // CURSOR POSITION
                  const divisionTime = 15 * 60;
                  const insideOffset = targetType === 'vertical' ? this.part * divisionTime : 0;
                  // const insideOffset = this.part * divisionTime;
                  if (this.offsetTimeTop === null && this.offsetTimeBottom === null) {
                    // this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds'); // + insideOffset
                    this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds') + insideOffset;
                    this.offsetTimeBottom = moment(payload.endDate).diff(targetData.endDate, 'seconds');
                  }

                  // const appointmentDuration = sourceType === targetType
                  //   ? moment(payload.endDate).diff(moment(payload.startDate), 'seconds') /* SAME TYPES */
                  //   : moment(targetData.endDate).diff(moment(targetData.startDate), 'seconds'); // DIFFERENT TYPES
                  const appointmentDuration = moment(payload.endDate).diff(moment(payload.startDate), 'seconds');

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
                  if (targetType === 'vertical') {
                    const intervals = calculateWeekDateIntervals(
                      draftAppointments, startViewDate, endViewDate, excludedDays,
                    );

                    this.rects = calculateRectByDateIntervals(
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
                        cellDuration: moment(targetData.endDate).diff(targetData.startDate, 'minutes'),
                        cellElements: timeTableCells,
                      },
                    );
                  } else {
                    const intervals = calculateMonthDateIntervals(
                      draftAppointments, startViewDate, endViewDate,
                    );
                    this.rects = calculateRectByDateIntervals(
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
                        cellElements: timeTableCells,
                      },
                    );
                  }
                }
              }

              if (!payload) return null;
              return (
                <Container>
                  {this.rects.map(({
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
              );
            }}
          </TemplateConnector>
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
