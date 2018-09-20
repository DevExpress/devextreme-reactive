import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Action, Plugin,
} from '@devexpress/dx-react-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.deleteAppointment = (rowId) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: rowId });
    };
    this.addAppointment = (appointment) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ added: appointment });
    };
  }

  render() {
    const {
      setAppointmentStartDate,
      setAppointmentEndDate,
      setAppointmentTitle,
    } = this.props;

    return (
      <Plugin
        name="EditingState"
      >
        <Getter name="setAppointmentStartDate" value={setAppointmentStartDate} />
        <Getter name="setAppointmentEndDate" value={setAppointmentEndDate} />
        <Getter name="setAppointmentTitle" value={setAppointmentTitle} />

        <Action name="addAppointment" action={this.addAppointment} />
        <Action name="deleteAppointment" action={this.deleteAppointment} />
      </Plugin>
    );
  }
}

EditingState.propTypes = {
  onCommitChanges: PropTypes.func.isRequired,
  setAppointmentStartDate: PropTypes.func,
  setAppointmentEndDate: PropTypes.func,
  setAppointmentTitle: PropTypes.func,
};

EditingState.defaultProps = {
  setAppointmentStartDate:
    (appointment, nextStartDate) => ({ ...appointment, startDate: nextStartDate }),
  setAppointmentEndDate:
    (appointment, nextEndDate) => ({ ...appointment, endDate: nextEndDate }),
  setAppointmentTitle:
    (appointment, nextTitle) => ({ ...appointment, title: nextTitle }),
};
