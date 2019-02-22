import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget,
  withComponents,
} from '@devexpress/dx-react-core';

// tslint:disable-next-line: max-line-length
class AppointmentDraggingRaw extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      order: props.defaultOrder,
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    };

    // this.onOver = this.handleOver.bind(this);
    // this.onLeave = this.handleLeave.bind(this);
    // this.onDrop = this.handleDrop.bind(this);
  }

  render() {
    const {
      containerComponent: Container,
      draftAppointmentComponent: DraftAppointment,
      draggingAppointmentComponent: DraggingAppointment,
      draggingPredicate,
    } = this.props;
    const {
      payload,
      clientOffset,
    } = this.state;

    return (
      <Plugin
        name="AppointmentDragging"
      >
        <Getter name="draggingPredicate" value={draggingPredicate} />

        <Template name="body">
          <Container>
            <TemplatePlaceholder />
          </Container>
        </Template>

      </Plugin>
    );
  }
}

const Container = ({
  onOver, onLeave, onDrop, children, draggingEnabled,
}) => (
  draggingEnabled ? (
    <DropTarget
      onOver={onOver}
      onLeave={onLeave}
      onDrop={onDrop}
    >
      {children}
    </DropTarget>
  ) : children
);

AppointmentDraggingRaw.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  draftAppointmentComponent: PropTypes.func.isRequired,
  draggingAppointmentComponent: PropTypes.func.isRequired,
  draggingPredicate: PropTypes.func,
};

AppointmentDraggingRaw.defaultProps = {
  draggingPredicate: () => true,
};

AppointmentDraggingRaw.components = {
  containerComponent: 'Container',
  draftAppointmentComponent: 'DraftAppointment',
  draggingAppointmentComponent: 'DraggingAppointment',
};

export const AppointmentDragging = withComponents({ Container })(AppointmentDraggingRaw);
