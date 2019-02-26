/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget,
  withComponents, DragSource,
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

  componentDidMount() {
    const [layout] = document.getElementsByClassName('dx-layout');
    this.layout = layout;
    this.layoutHeaderRect = document.getElementsByClassName('dx-layout-header')[0].getBoundingClientRect();
  }

  onPayloadChange({ payload }) {
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
    console.log('drop!');
    // const { payload } = this.state;
    commitChangedAppointment({ appointmentId: this.payload.id });

    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.timeTableIndex = null;
    this.allDayIndex = null;

    this.payload = null;

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
      timeTableIndex, payload, timeTableCells, allDayIndex, allDayCells,
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
        <Getter name="draggingPredicate" value={draggingPredicate} />

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
            <DragSource
              payload={params.data}
            >
              {payload && params.data.id === payload.id ? (
                <DraggingAppointment {...params} />
              ) : (
                <TemplatePlaceholder {...params} />
              )}
            </DragSource>
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
                const sourceType = appointmentDuration < 24 * 60 * 60
                  ? 'vertical' : 'horizontal';

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
                const appointmentDuration = moment(payload.endDate).diff(moment(payload.startDate), 'seconds');

                if (firstIndex > -1 && secondIndex > -1) {
                  const targetData = viewCellsData[firstIndex][secondIndex];
                  const targetType = moment(targetData.startDate).diff(targetData.endDate, 'hours') < 24
                    ? 'vertical' : 'horizontal';
                  const sourceType = appointmentDuration < 24 * 60 * 60
                    ? 'vertical' : 'horizontal';

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
