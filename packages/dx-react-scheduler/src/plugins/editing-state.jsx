import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Action, Plugin,
} from '@devexpress/dx-react-core';

export class EditingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.deleteAppointment = (rowId) => {
      const { onCommitChanges } = this.props;
      onCommitChanges({ deleted: rowId });
    };
  }

  render() {
    return (
      <Plugin
        name="EditingState"
      >
        <Action name="deleteAppointment" action={this.deleteAppointment} />
      </Plugin>
    );
  }
}

EditingState.propTypes = {
  onCommitChanges: PropTypes.func.isRequired,
};
