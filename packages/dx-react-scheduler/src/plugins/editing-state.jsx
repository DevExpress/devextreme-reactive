import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Action, Plugin, Getter, createStateHelper,
} from '@devexpress/dx-react-core';
import {
  addAppointment,
  changeAddedAppointment,
  cancelAddedAppointment,
} from '@devexpress/dx-scheduler-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // editingAppointmentId: props.editingAppointmentId || props.defaultEditingAppointmentId,
      addedAppointment: props.addedAppointment || props.defaultAddedAppointment,
      // appointmentChanges,
    };


    const stateHelper = createStateHelper(
      this,
      {
        addedAppointment: () => {
          const { onAddedAppointmentChange } = this.props;
          return onAddedAppointmentChange;
        },
      },
    );

    this.addAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', addAppointment);
    this.changeAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', changeAddedAppointment);
    this.cancelAddedAppointment = stateHelper.applyFieldReducer
      .bind(stateHelper, 'addedAppointment', cancelAddedAppointment);
    this.commitAddedAppointment = () => {
      const { onCommitChanges } = this.props;
      const { addedAppointment: stateAddedAppointment } = this.state;
      onCommitChanges({
        added: this.validateAppointment(stateAddedAppointment),
      });
      this.cancelAddedAppointment();
    };

    this.deleteAppointment = (appointmentId) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: appointmentId });
    };
    this.validateAppointment = ({ startDate, endDate, title }) => {
      const {
        setAppointmentEndDate,
        setAppointmentStartDate,
        setAppointmentTitle,
      } = this.props;

      const appointment = {};
      const a = setAppointmentTitle(appointment, title);
      const b = setAppointmentStartDate(a, startDate);
      const c = setAppointmentEndDate(b, endDate);
      return c;
    };
  }

  render() {
    const {
      disableAdding,
      disableDeleting,
    } = this.props;
    const { addedAppointment } = this.state;

    console.log(addedAppointment);

    return (
      <Plugin
        name="EditingState"
      >
        {/* <Action name="addAppointment" action={disableAdding ? () => undefined : this.addAppointment} /> */}
        <Action name="deleteAppointment" action={disableDeleting ? () => undefined : this.deleteAppointment} />

        <Getter name="addedAppointment" value={addedAppointment} />
        <Action name="addAppointment" action={this.addAppointment} />
        <Action name="changeAddedAppointment" action={this.changeAddedAppointment} />
        <Action name="cancelAddedAppointment" action={this.cancelAddedAppointment} />
        <Action name="commitAddedAppointment" action={this.commitAddedAppointment} />
      </Plugin>
    );
  }
}

EditingState.propTypes = {
  onCommitChanges: PropTypes.func.isRequired,
  setAppointmentStartDate: PropTypes.func,
  setAppointmentEndDate: PropTypes.func,
  setAppointmentTitle: PropTypes.func,
  disableAdding: PropTypes.bool,
  disableDeleting: PropTypes.bool,

  addedAppointment: PropTypes.object,
  defaultAddedAppointment: PropTypes.object,
  onAddedAppointmentChange: PropTypes.func,
};

EditingState.defaultProps = {
  setAppointmentStartDate:
    (appointment, nextStartDate) => ({ ...appointment, startDate: nextStartDate }),
  setAppointmentEndDate: (appointment, nextEndDate) => ({ ...appointment, endDate: nextEndDate }),
  setAppointmentTitle: (appointment, nextTitle) => ({ ...appointment, title: nextTitle }),
  disableAdding: false,
  disableDeleting: false,

  addedAppointment: undefined,
  defaultAddedAppointment: {},
  onAddedAppointmentChange: undefined,
};
