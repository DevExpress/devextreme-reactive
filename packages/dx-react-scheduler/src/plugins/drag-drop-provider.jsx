import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';

const getTargetColumns = payload => payload
  .filter(item => item.type === 'appointment');

export class DragDropProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      payload: null,
      clientOffset: null,
    };

    this.change = ({ payload, clientOffset }) => this.setState({ payload, clientOffset });
  }

  render() {
    const {
      containerComponent: Container,
      columnComponent: Appointment,
    } = this.props;
    const {
      payload,
      clientOffset,
    } = this.state;


    // SCROLL AREA
    const SCROLL_OFFSET = 50;
    const SCROLL_SPEED_PX = 30;
    const layout = document.getElementsByClassName('dx-layout')[0];
    const layoutHeader = document.getElementsByClassName('dx-layout-header')[0];

    if (clientOffset && clientOffset.y - SCROLL_OFFSET < layoutHeader.clientHeight) {
      layout.scrollTop -= SCROLL_SPEED_PX;
    }
    if (clientOffset && layout.clientHeight - SCROLL_OFFSET < clientOffset.y) {
      layout.scrollTop += SCROLL_SPEED_PX;
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
            <TemplateConnector>
              {({ appointments }) => (
                <Container
                  clientOffset={clientOffset}
                >
                  {getTargetColumns(payload)
                    .map(appointment => (
                      // <Appointment
                      //   key={appointment.data.id}
                      //   appointmentData={appointment.data}
                      //   rect={{ height: appointment.style.height, width: appointment.style.width }}
                      //   appointmentRef={appointment.appointmentRef}
                      // />
                      () => null
                    ))
                  }
                </Container>
              )}
            </TemplateConnector>
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
