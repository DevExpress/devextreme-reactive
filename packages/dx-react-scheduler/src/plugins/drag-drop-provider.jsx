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
      sourcePayload: null,
      sourceData: null,
    };

    this.payload = null;
    this.sourcePayload = null;
    this.offsetTimeTop = null;
    this.offsetTimeBottom = null;

    this.sourceData = null;

    this.appointmentStartTime = 0;
    this.appointmentEndTime = 0;

    this.rects = [];
    this.allDayRects = [];

    this.change = (args) => {
      if (args.payload) {
        this.payload = args.payload;
      }
      if (args.payload && args.sourcePayload && args.sourcePayload !== this.sourcePayload) {
        if (args.sources.size > 1) {
          const index = args.sources.findIndex(source => source.type === 'allDay');
          if (index > -1) {
            this.source = args.sources[index];
          }
        } else {
          this.sourceData = args.sources[0];
        }
        console.log(args.sources);
        console.log(this.sourceData);

        if (args.payload[0].type === this.sourceData.type || (this.sourceData.type === 'allDay' && args.payload[0].type === 'horizontal')) { // SAME TYPES && All DAY
          const appointmentDuration = moment(args.payload[0].data.endDate).diff(moment(args.payload[0].data.startDate), 'seconds');

          // CURSOR POSITION
          if (this.sourceData && this.offsetTimeTop === null && this.offsetTimeBottom === null) {
            this.offsetTimeTop = moment(this.sourceData.startDate).diff(args.payload[0].data.startDate, 'seconds');
            this.offsetTimeBottom = moment(args.payload[0].data.endDate).diff(this.sourceData.endDate, 'seconds');
          }

          this.appointmentStartTime = moment(this.sourceData.startDate).add((this.offsetTimeTop) * (-1), 'seconds').toDate();
          this.appointmentEndTime = moment(this.sourceData.startDate).add((appointmentDuration - this.offsetTimeTop), 'seconds').toDate();
          args.payload[0].changeAppointment({
            change: {
              startDate: this.appointmentStartTime,
              endDate: this.appointmentEndTime,
            },
          });
        } else { // DIFFERENT TYPES
          this.appointmentStartTime = this.sourceData.startDate;
          this.appointmentEndTime = this.sourceData.endDate;
          args.payload[0].changeAppointment({
            change: {
              startDate: this.sourceData.startDate,
              endDate: this.sourceData.endDate,
            },
          });
        }
      }
      if (args.sourcePayload) {
        this.sourcePayload = args.sourcePayload;
      }

      this.setState({
        payload: args.payload,
        clientOffset: args.clientOffset,
        sourcePayload: args.sourcePayload,
        sourceData: this.sourceData,
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
      draggingAppointment: DraggingAppointment,
    } = this.props;
    const {
      payload,
      clientOffset,
      sourcePayload,
      sourceData,
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

    // CURSOR POSITION
    // if (payload && sourceData && this.offsetTimeTop === null && this.offsetTimeBottom === null) {
    //   this.offsetTimeTop = moment(sourceData.startDate).diff(payload[0].data.startDate, 'seconds');
    //   this.offsetTimeBottom = moment(payload[0].data.endDate).diff(sourceData.endDate, 'seconds');
    // }

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

    // DROP OUTSIDE DRAG TARGET !!!!!!!
    if (this.payload && !payload && this.sourceData) {
      this.payload[0].commitChangedAppointment({ appointmentId: this.payload[0].data.id });
      this.payload = null;
      this.sourcePayload = null;
      this.sourceData = [];

      this.sourceData = null;

      this.offsetTimeTop = null;
      this.offsetTimeBottom = null;

      this.rects = [];
      this.allDayRects = [];
    }

    if (payload && this.sourceData) {
      this.rects = [];
      this.allDayRects = [];

      const tbodyElement = this.sourceData.cellRef.current.parentElement.parentElement;
      const draftAppointments = [{ ...payload[0].data, start: this.appointmentStartTime, end: this.appointmentEndTime }];
      if (this.sourceData.type === 'vertical') {
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
            cellDuration: moment(this.sourceData.endDate).diff(this.sourceData.startDate, 'minutes'),
            cellElements: tbodyElement.querySelectorAll('td'),
          },
        );
      } else if (this.sourceData.type === 'horizontal') {
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
      } else if (this.sourceData.type === 'allDay') {
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
            cellDuration: moment(this.sourceData.endDate).diff(this.sourceData.startDate, 'minutes'),
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
        {/* <Getter name="draggingDisable" value={} /> */}
        <Getter name="appointmentTemplate" value={DraggingAppointment} />
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
            }, index) => {
              const rect = getAppointmentStyle(geometry);
              return (
                <Appointment
                  key={index.toString()}
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
            }, index) => {
              const rect = getAppointmentStyle(geometry);
              return (
                <Appointment
                  key={index.toString()}
                  data={{ ...payload[0].data, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime }}
                  rect={rect}
                />
              );
            })}
          </Container>
          )}
        </Template>

        <Template name="appointment">
          {(params) => {
            return <TemplatePlaceholder params={{ ...params, drag: payload && params.data.id === payload[0].data.id }} />;
          }}
        </Template>
      </Plugin>
    );
  }
}

DragDropProvider.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  columnComponent: PropTypes.func.isRequired,
  draggingAppointment: PropTypes.func.isRequired,
  draggingDisable: PropTypes.func,
};

DragDropProvider.defaultTypes = {
  draggingDisable: () => true,
};

DragDropProvider.components = {
  containerComponent: 'Container',
  columnComponent: 'Column',
  draggingAppointment: 'DraggingAppointment',
};
