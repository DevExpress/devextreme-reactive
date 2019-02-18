import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import moment from 'moment';

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

    this.change = (args) => {
      // console.log(args);
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
        console.log('save');
        args.payload[0].changeAppointment({
          change: {
            startDate: moment(args.sourcePayload.startDate).add((this.offsetTimeTop) * (-1), 'seconds').toDate(),
            endDate: moment(args.sourcePayload.startDate).add((args.payload[0].appointmentDuration - this.offsetTimeTop), 'seconds').toDate(),
          },
        });
      }

      this.setState({
        payload: args.payload,
        clientOffset: args.clientOffset,
        source: args.source,
        sourcePayload: args.sourcePayload,
      });
    };
    this.moveOffset = null;
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

    // note - Add SSR support
    // AUTO SCROLL
    const SCROLL_OFFSET = 50;
    const SCROLL_SPEED_PX = 30;
    const layout = document.getElementsByClassName('dx-layout')[0];
    const layoutHeader = document.getElementsByClassName('dx-layout-header')[0];

    if (clientOffset && clientOffset.y - SCROLL_OFFSET < layoutHeader.clientHeight) { // disable scroll onOver AllDay
      layout.scrollTop -= SCROLL_SPEED_PX;
    }
    if (clientOffset && layout.clientHeight - SCROLL_OFFSET < clientOffset.y) {
      layout.scrollTop += SCROLL_SPEED_PX;
    }

    // for cursor position
    if (payload && payload[0].appointmentRef && source && this.offsetTopPX === 0 && this.offsetBottomPX === 0) {
      this.appointmentHeightPX = payload[0].appointmentDuration * sourcePayload.cellRef.current.getBoundingClientRect().height / 1800;
      this.offsetTimeTop = moment(sourcePayload.startDate).diff(payload[0].data.startDate, 'seconds');
      this.offsetTimeBottom = moment(payload[0].data.endDate).diff(sourcePayload.endDate, 'seconds');
      this.offsetTopPX = sourcePayload.cellRef.current.getBoundingClientRect().top - payload[0].appointmentRef.current.getBoundingClientRect().top;
      this.offsetBottomPX = payload[0].appointmentRef.current.getBoundingClientRect().bottom - sourcePayload.cellRef.current.getBoundingClientRect().bottom;
    }

    if (!payload) {
      this.moveOffset = null;
    }
    this.moveOffset = 0; // !!!!!!!!

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
    }

    // SLICE APPOINTMENTS BY BOUNDARIES
    let appointmentTop = 0;
    let appointmentLeft = 0;
    let appointmentHeight = 0;
    let appointmentWidth = 0;

    let draftHeight = payload && payload[0].style.height;

    if (payload) {
      const tbodyElement = this.source.parentElement.parentElement;
      const tableRect = tbodyElement.getBoundingClientRect();
      const cellRect = this.source.getBoundingClientRect();

      appointmentLeft = cellRect.left; // only for week view
      appointmentWidth = cellRect.width; // only for week view

      // if (cellRect.top - this.offsetTopPX < tableRect.top) { // TOP BOUNDARY
      //   appointmentTop = tableRect.top;
      //   appointmentHeight = cellRect.bottom - tableRect.top + this.offsetBottomPX;
      // } else {
      //   appointmentTop = cellRect.top - this.offsetTopPX;
      //   appointmentHeight = draftHeight;
      //   // appointmentHeight = payload[0].appointmentDuration * cellRect.height / 1800;
      // }
      // // console.log(cellRect.bottom + Math.abs(this.offsetBottomPX));
      // // console.log(tableRect.bottom);
      // if (cellRect.bottom + this.offsetBottomPX > tableRect.bottom) { // BOTTOM BOUNDARY
      //   // appointmentLeft = cellRect.left; // only for week view
      //   // appointmentTop = (cellRect.top - this.offsetTopPX < top) ? top : cellRect.top - this.offsetTopPX;
      //   appointmentHeight = tableRect.bottom - cellRect.top + this.offsetTopPX;
      //   // appointmentWidth = cellRect.width; // only for week view
      // }

      const topTime = moment(payload[0].viewBoundaries.start).date(this.sourcePayload.startDate.getDate()).toDate();
      const bottomTime = moment(payload[0].viewBoundaries.end).date(this.sourcePayload.startDate.getDate()).toDate();
      if (moment(this.sourcePayload.startDate).add(-this.offsetTimeTop, 'seconds').isSameOrBefore(topTime)) { // TOP BOUNDARY
        appointmentTop = tableRect.top;
        appointmentHeight = cellRect.bottom - tableRect.top + this.offsetBottomPX;

        this.appointmentHeight = appointmentHeight;
        this.offsetTopPX = cellRect.top - tableRect.top;
      } else {
        // appointmentTop = cellRect.top - this.offsetTopPX;
        appointmentTop = cellRect.top - (this.offsetTimeTop * cellRect.height / 1800);
        // appointmentHeight = draftHeight > this.appointmentHeight ? draftHeight : this.appointmentHeight;
        appointmentHeight = this.appointmentHeightPX;
      }
      if (moment(this.sourcePayload.endDate).add(this.offsetTimeBottom, 'seconds').isSameOrAfter(bottomTime)) { // BOTTOM BOUNDARY
        appointmentHeight = tableRect.bottom - cellRect.top + this.offsetTopPX;
        this.appointmentHeight = appointmentHeight;
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
          {payload && (
            <Container
              clientOffset={clientOffset}
              left={appointmentLeft}
              top={appointmentTop} // : clientOffset.y - this.moveOffset + topOffset}
            >
              <Appointment
                data={{ ...payload[0].data, ...this.sourcePayload }} // NOTE use endDate: moment(this.props.startDate).add(payload[0].appointmentDuration, 'seconds').toDate()
                rect={{
                  height: appointmentHeight,
                  width: appointmentWidth,
                }}
              />
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
