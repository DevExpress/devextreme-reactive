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
    this.offsetY = 0;
    this.timeOffset = 0;

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
        args.payload[0].changeAppointment({
          change: {
            startDate: moment(args.sourcePayload.startDate).add((this.offsetTime) * (-1), 'seconds').toDate(),
            endDate: moment(args.sourcePayload.startDate).add((args.payload[0].appointmentDuration - this.offsetTime), 'seconds').toDate(),
          },
        });
      }
      this.setState({ payload: args.payload, clientOffset: args.clientOffset, source: args.source, sourcePayload: args.sourcePayload });
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
    if (payload && payload[0].appointmentRef && source && this.offsetY === 0) {
      this.offsetTime = moment(sourcePayload.startDate).diff(payload[0].data.startDate, 'seconds');
      console.log(this.offsetTime);
      this.offsetY = sourcePayload.cellRef.current.getBoundingClientRect().top - payload[0].appointmentRef.current.getBoundingClientRect().top;
    }
    if (!payload) {
      this.moveOffset = null;
    }
    this.moveOffset = 0; // !!!!!!!!

    // if (source) {
    //   console.log(source.getBoundingClientRect());
    //   console.log(clientOffset.y);
    // }

    // All Day
    let draftHeight = payload && payload[0].style.height;
    if (this.sourcePayload && payload) {
      // if (moment(sourcePayload.endDate).diff(sourcePayload.startDate, 'hours') > 23) {
      //   draftHeight = sourcePayload.cellRef.current.getBoundingClientRect().height;
      // }
      if (payload[0].type !== this.sourcePayload.type) {
        draftHeight = this.sourcePayload.cellRef.current.getBoundingClientRect().height;
      }
    }


    // Move by cell parts
    let topOffset = 0;
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

    console.log(payload && payload[0]);
    console.log(this.payload && this.payload[0]);

    if (payload && this.payload !== payload) { // ENTER TO NEW DRAG TARGET
      // if (this.offsetTime !== 0) {
      //   this.offsetTime = moment(sourcePayload.startDate).diff(payload[0].data.startDate, 'minutes');
      // }
      console.log(12333213);
      payload[0].changeAppointment({
        change: {
          startDate: moment(sourcePayload.startDate).add((this.offsetTime) * (-1), 'seconds').toDate(),
          endDate: moment(sourcePayload.startDate).add((payload[0].appointmentDuration - this.offsetTime), 'seconds').toDate(),
        },
      });
    }

    if (this.payload && !payload) { // DROP OUTSIDE DRAG TARGET !!!!!!!
      // payload[0].changeAppointment({
      //   change: {
      //     startDate: sourcePayload.startDate,
      //     endDate: moment(sourcePayload.startDate).add(payload[0].appointmentDuration, 'seconds').toDate(),
      //   },
      // });
      this.payload[0].commitChangedAppointment({ appointmentId: this.payload[0].data.id });
      this.payload = null;
      this.sourcePayload = null;
      this.source = null;
      this.offsetY = 0;
      this.timeOffset = 0;
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
              left={this.source.getBoundingClientRect().left}
              top={this.source.getBoundingClientRect().top - this.offsetY} // : clientOffset.y - this.moveOffset + topOffset}
            >
              <Appointment
                data={{ ...payload[0].data, ...this.sourcePayload }} // NOTE use endDate: moment(this.props.startDate).add(payload[0].appointmentDuration, 'seconds').toDate()
                rect={{
                  height: draftHeight,
                  width: this.source ? this.source.getBoundingClientRect().width : payload[0].style.width,
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
