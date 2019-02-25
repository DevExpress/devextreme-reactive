/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget,
  withComponents, DragSource,
} from '@devexpress/dx-react-core';
import {
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

    this.onDrop2 = action => args => this.onDrop(args, action);

    this.allDayCells = [];
    this.timeTableCells = [];

    this.timeTableIndex = undefined;

    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.rects = [];
  }

  componentDidMount() {
    const [layout] = document.getElementsByClassName('dx-layout');
    this.layout = layout;
    this.layoutHeaderRect = document.getElementsByClassName('dx-layout-header')[0].getBoundingClientRect();
  }

  handleOver({ payload, clientOffset }) {
    const timeTableCells = Array.from(document.getElementsByClassName('dx-time-table')[0].querySelectorAll('td'));
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

    this.setState({
      timeTableIndex,
      payload,
      timeTableCells,
    });
  }

  handleLeave() {
    // use cash for make draft appointments
  }

  handleDrop(args, commitChangedAppointment) {
    const { payload } = this.state;
    commitChangedAppointment({ appointmentId: payload.id });

    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.setState({
      timeTableCells: [],
      allDayCells: [],
      payload: undefined,
      timeTableIndex: undefined,
    });
  }

  render() {
    const { timeTableIndex, payload, timeTableCells } = this.state;
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

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
            }, { changeAppointment }) => {
              this.rects = [];

              if (timeTableIndex !== -1 && payload) {
                const firstIndex = Math.floor(timeTableIndex / viewCellsData[0].length);
                const secondIndex = timeTableIndex % viewCellsData[0].length;
                const appointmentDuration = moment(payload.endDate).diff(moment(payload.startDate), 'seconds');

                if (firstIndex > -1 && secondIndex > -1) {
                  const targetData = viewCellsData[firstIndex][secondIndex];
                  // CURSOR POSITION
                  if (this.offsetTimeTop === null && this.offsetTimeBottom === null) {
                    this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds');
                    this.offsetTimeBottom = moment(payload.endDate).diff(targetData.endDate, 'seconds');
                  }


                  this.appointmentStartTime = moment(targetData.startDate).add((this.offsetTimeTop) * (-1), 'seconds').toDate();
                  this.appointmentEndTime = moment(targetData.startDate).add((appointmentDuration - this.offsetTimeTop), 'seconds').toDate();

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

              if (payload === undefined) return null;
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
