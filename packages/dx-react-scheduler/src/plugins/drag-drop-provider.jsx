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

    this.change = (args) => {
      // console.log(args);
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
    console.log(payload);
    if (payload && payload[0].appointmentRef && this.moveOffset === null) {
      const moveOffset = clientOffset.y - payload[0].appointmentRef.current.getBoundingClientRect().top;
      if (this.moveOffset !== moveOffset) {
        this.moveOffset = moveOffset;
      }
      console.log(this.moveOffset);
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
    if (sourcePayload) {
      // if (moment(sourcePayload.endDate).diff(sourcePayload.startDate, 'hours') > 23) {
      //   draftHeight = sourcePayload.cellRef.current.getBoundingClientRect().height;
      // }
      if (payload[0].type !== sourcePayload.type) {
        draftHeight = sourcePayload.cellRef.current.getBoundingClientRect().height;
      }
    }


    // Move by cell parts
    let topOffset = 0;
    if (clientOffset && sourcePayload) {
      let part = (clientOffset.y - sourcePayload.cellRef.current.getBoundingClientRect().top) / sourcePayload.cellRef.current.getBoundingClientRect().height;

      let minus = 1;
      if (part < 0) {
        minus *= -1;
      }

      if (Math.abs(part) > 1) { // return
        // this.setState({ payload: {}, over: false, top: undefined, part: 0 });
      }

      if (part > 0 && part < 0.25) {
        part = 0;
      } else if ((part < 0 && part > -0.25)) {
        part = -0.01;
      } else if (Math.abs(part) < 0.5) {
        part = 0.25 * minus;
      } else if (Math.abs(part) < 0.75) {
        part = 0.5 * minus;
      } else if (Math.abs(part) < 1) {
        part = 0.75 * minus;
      }
      if (part < 0) {
        part = 1 + part;
      }
      topOffset = sourcePayload.cellRef.current.getBoundingClientRect().height * part;
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
              left={source ? source.getBoundingClientRect().left : clientOffset.x}
              top={source ? source.getBoundingClientRect().top - this.moveOffset + topOffset : clientOffset.y - this.moveOffset + topOffset}
            >
              <Appointment
                data={{ ...payload[0].data, ...sourcePayload }} // NOTE use endDate: moment(this.props.startDate).add(payload[0].appointmentDuration, 'seconds').toDate()
                rect={{
                  height: draftHeight,
                  width: source ? source.getBoundingClientRect().width : payload[0].style.width,
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
