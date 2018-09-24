import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Action, Plugin,
} from '@devexpress/dx-react-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.deleteAppointment = (appointmentId) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: appointmentId });
    };
    this.addAppointment = ({ startDate, endDate, title }) => {
      const {
        onCommitChanges,
        setAppointmentEndDate,
        setAppointmentStartDate,
        setAppointmentTitle,
      } = this.props;

      const appointment = {};
      const a = setAppointmentTitle(appointment, title);
      const b = setAppointmentStartDate(a, startDate);
      const c = setAppointmentEndDate(b, endDate);
      onCommitChanges({ added: c });
    };
  }

  render() {
    const {
      disableAdding,
      disableDeleting,
    } = this.props;

    return (
      <Plugin
        name="EditingState"
      >
        <Action name="addAppointment" action={disableAdding ? () => undefined : this.addAppointment} />
        <Action name="deleteAppointment" action={disableDeleting ? () => undefined : this.deleteAppointment} />
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
};

EditingState.defaultProps = {
  setAppointmentStartDate:
    (appointment, nextStartDate) => ({ ...appointment, startDate: nextStartDate }),
  setAppointmentEndDate: (appointment, nextEndDate) => ({ ...appointment, endDate: nextEndDate }),
  setAppointmentTitle: (appointment, nextTitle) => ({ ...appointment, title: nextTitle }),
  disableAdding: false,
  disableDeleting: false,
};
