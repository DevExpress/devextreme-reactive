/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  DragDropProvider as DragDropProviderCore,
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
import moment from 'moment';

const SCROLL_OFFSET = 50;
const SCROLL_SPEED_PX = 30;

export class DragDropProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      payload: null,
      clientOffset: null,
      source: null,
      sourcePayload: null,
    };

    this.payload = null;
    this.sourcePayload = null;
    this.source = null;
    this.offsetTopPX = 0;
    this.offsetBottomPX = 0;
    this.offsetTimeTop = 0;
    this.offsetTimeBottom = 0;

    this.appointmentHeight = 0;
    this.appointmentHeightPX = 0;

    this.appointmentStartTime = 0;
    this.appointmentEndTime = 0;

    this.rects = [];
    this.allDayRects = [];

    this.change = (args) => {
      if (args.sourcePayload) {
        this.sourcePayload = args.sourcePayload;
      }
      if (args.source) {
        this.source = args.source;
      }
      if (args.payload) {
        this.payload = args.payload;
      }
      if (args.payload && args.sourcePayload) {
        if (args.payload[0].type === args.sourcePayload.type || (args.sourcePayload.type === 'allDay' && args.payload[0].type === 'horizontal')) { // SAME TYPES && All DAY
          this.appointmentStartTime = moment(args.sourcePayload.startDate).add((this.offsetTimeTop) * (-1), 'seconds').toDate();
          this.appointmentEndTime = moment(args.sourcePayload.startDate).add((args.payload[0].appointmentDuration - this.offsetTimeTop), 'seconds').toDate();
          args.payload[0].changeAppointment({
            change: {
              startDate: this.appointmentStartTime,
              endDate: this.appointmentEndTime,
            },
          });
        } else { // DIFFERENT TYPES
          this.appointmentStartTime = args.sourcePayload.startDate;
          this.appointmentEndTime = args.sourcePayload.endDate;
          args.payload[0].changeAppointment({
            change: {
              startDate: args.sourcePayload.startDate,
              endDate: args.sourcePayload.endDate,
            },
          });
        }
      }

      this.setState({
        payload: args.payload,
        clientOffset: args.clientOffset,
        source: args.source,
        sourcePayload: args.sourcePayload,
      });
    };
  }

  componentDidMount() {
    const [layout] = document.getElementsByClassName('dx-layout');
    this.layout = layout;
    this.layoutHeaderRect = document.getElementsByClassName('dx-layout-header')[0].getBoundingClientRect();
  }

  render() {
    const {
      containerComponent: Container,
      columnComponent: Appointment,
    } = this.props;
    const {
      payload,
      clientOffset,
      source,
      sourcePayload,
    } = this.state;

    // AUTO SCROLL
    if (this.layout && clientOffset) {
      if ((clientOffset.y - SCROLL_OFFSET < this.layoutHeaderRect.height + this.layoutHeaderRect.top) && (clientOffset.y > this.layoutHeaderRect.height + this.layoutHeaderRect.top)) {
        this.layout.scrollTop -= SCROLL_SPEED_PX;
      }
      if (this.layout.clientHeight - SCROLL_OFFSET < clientOffset.y - this.layout.offsetTop) {
        this.layout.scrollTop += SCROLL_SPEED_PX;
      }
    }

    // for cursor position
    if (payload && payload[0].appointmentRef && source && this.offsetTopPX === 0 && this.offsetBottomPX === 0) {
      this.appointmentHeightPX = payload[0].appointmentDuration * sourcePayload.cellRef.current.getBoundingClientRect().height / moment(sourcePayload.endDate).diff(sourcePayload.startDate, 'seconds');
      this.offsetTimeTop = moment(sourcePayload.startDate).diff(payload[0].data.startDate, 'seconds');
      this.offsetTimeBottom = moment(payload[0].data.endDate).diff(sourcePayload.endDate, 'seconds');
      this.offsetTopPX = sourcePayload.cellRef.current.getBoundingClientRect().top - payload[0].appointmentRef.current.getBoundingClientRect().top;
      this.offsetBottomPX = payload[0].appointmentRef.current.getBoundingClientRect().bottom - sourcePayload.cellRef.current.getBoundingClientRect().bottom;
    }

    // Move by cell parts
    // if (clientOffset && this.sourcePayload) {
    //   let part = (clientOffset.y - this.sourcePayload.cellRef.current.getBoundingClientRect().top) / this.sourcePayload.cellRef.current.getBoundingClientRect().height;

    //   let minus = 1;
    //   if (part < 0) {
    //     minus *= -1;
    //   }

    //   if (Math.abs(part) > 1) { // return
    //     // this.setState({ payload: {}, over: false, top: undefined, part: 0 });
    //   }

    //   if (part > 0 && part < 0.25) {
    //     part = 0;
    //   } else if ((part < 0 && part > -0.25)) {
    //     part = -0.01;
    //   } else if (Math.abs(part) < 0.5) {
    //     part = 0.25 * minus;
    //   } else if (Math.abs(part) < 0.75) {
    //     part = 0.5 * minus;
    //   } else if (Math.abs(part) < 1) {
    //     part = 0.75 * minus;
    //   }
    //   if (part < 0) {
    //     part = 1 + part;
    //   }
    //   topOffset = this.sourcePayload.cellRef.current.getBoundingClientRect().height * part;
    // }

    if (this.payload && !payload) { // DROP OUTSIDE DRAG TARGET !!!!!!!
      this.payload[0].commitChangedAppointment({ appointmentId: this.payload[0].data.id });
      this.payload = null;
      this.sourcePayload = null;
      this.source = null;

      this.offsetTopPX = 0;
      this.offsetBottomPX = 0;
      this.offsetTimeTop = 0;
      this.offsetTimeBottom = 0;
      this.appointmentHeight = 0;

      this.rects = [];
      this.allDayRects = [];
      this.templateName = 'main';
    }

    if (payload) {
      this.rects = [];
      this.allDayRects = [];

      const tbodyElement = this.source.parentElement.parentElement;
      const draftAppointments = [{ ...payload[0].data, start: this.appointmentStartTime, end: this.appointmentEndTime }];
      this.templateName = this.sourcePayload.type !== 'allDay' ? 'main' : 'navbar';
      if (this.sourcePayload.type === 'vertical') {
        const intervals = calculateWeekDateIntervals(
          draftAppointments, payload[0].viewBoundaries.start, payload[0].viewBoundaries.end, payload[0].excludedDays,
        );
        this.rects = calculateRectByDateIntervals(
          {
            growDirection: 'vertical',
            multiline: false,
          },
          intervals,
          getVerticalRectByDates,
          {
            startViewDate: payload[0].viewBoundaries.start,
            endViewDate: payload[0].viewBoundaries.end,
            viewCellsData: payload[0].viewCellsData,
            cellDuration: moment(this.sourcePayload.endDate).diff(this.sourcePayload.startDate, 'minutes'),
            cellElements: tbodyElement.querySelectorAll('td'),
          },
        );
      } else if (this.sourcePayload.type === 'horizontal') {
        const intervals = calculateMonthDateIntervals(
          draftAppointments, payload[0].viewBoundaries.start, payload[0].viewBoundaries.end,
        );
        this.rects = calculateRectByDateIntervals(
          {
            growDirection: 'horizontal',
            multiline: true,
          },
          intervals,
          getHorizontalRectByDates,
          {
            startViewDate: payload[0].viewBoundaries.start,
            endViewDate: payload[0].viewBoundaries.end,
            viewCellsData: payload[0].viewCellsData,
            cellElements: tbodyElement.querySelectorAll('td'),
          },
        );
      } else if (this.sourcePayload.type === 'allDay') {
        const intervals = calculateAllDayDateIntervals(
          draftAppointments, payload[0].viewBoundaries.start, payload[0].viewBoundaries.end, payload[0].excludedDays,
        );
        this.allDayRects = calculateRectByDateIntervals(
          {
            growDirection: 'horizontal',
            multiline: false,
          },
          intervals,
          getHorizontalRectByDates,
          {
            startViewDate: payload[0].viewBoundaries.start,
            endViewDate: payload[0].viewBoundaries.end,
            viewCellsData: payload[0].viewCellsData,
            cellDuration: moment(this.sourcePayload.endDate).diff(this.sourcePayload.startDate, 'minutes'),
            cellElements: tbodyElement.querySelectorAll('th'),
            excludedDays: payload[0].excludedDays,
          },
        );
      }
    }

    return (
      <Plugin
        name="DragDropProvider"
      >
        <Getter name="draggingEnabled" value />
        <Template name="root">
          <DragDropProviderCore
            onChange={this.change}
          >
            <TemplatePlaceholder />
          </DragDropProviderCore>
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          <div className="MAXIM" />
          {payload && (
          <Container
            clientOffset={clientOffset}
          >
            {this.rects.map(({
              dataItem, type, ...geometry
            }) => {
              const rect = getAppointmentStyle(geometry);
              return (
                <Appointment
                  data={{ ...payload[0].data, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime }}
                  rect={rect}
                />
              );
            })}
          </Container>
          )}
        </Template>
        <Template name="allDayPanel">
          <TemplatePlaceholder />
          <div className="MAXIM" />
          {payload && (
          <Container
            clientOffset={clientOffset}
          >
            {this.allDayRects.map(({
              dataItem, type, ...geometry
            }) => {
              const rect = getAppointmentStyle(geometry);
              return (
                <Appointment
                  data={{ ...payload[0].data, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime }}
                  rect={rect}
                />
              );
            })}
          </Container>
          )}
        </Template>
      </Plugin>
    );
  }
}

DragDropProvider.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  columnComponent: PropTypes.func.isRequired,
};

DragDropProvider.components = {
  containerComponent: 'Container',
  columnComponent: 'Column',
};
