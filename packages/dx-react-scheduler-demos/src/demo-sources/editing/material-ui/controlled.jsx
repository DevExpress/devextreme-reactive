import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import appointments from '../../../demo-data/today-appointments';

const getId = appointment => appointment.id;

class EditingForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openForm: false,
    };

    this.onOpenButtonClick = this.onOpenButtonClick.bind(this);
  }

  onOpenButtonClick() {
    const { openForm: open } = this.state;
    this.setState({ openForm: !open });
  }

  render() {
    const { openForm } = this.state;

    return (
      <Plugin name="EditingForm">
        <Template name="footer">
          <TemplateConnector>
            {(
              { addedAppointment },
              { cancelAddedAppointment, changeAddedAppointment, commitAddedAppointment },
            ) => (
              <Paper>
                <Button onClick={this.onOpenButtonClick}>
                  Toggle Form
                </Button>
                {openForm && (
                  <React.Fragment>
                    <Button onClick={() => commitAddedAppointment()}>
                      Save
                    </Button>
                    <Button onClick={() => cancelAddedAppointment()}>
                      Cancel
                    </Button>
                    <TextField
                      label="Title"
                      margin="normal"
                      variant="outlined"
                      value={addedAppointment.title || ''}
                      onChange={({ target }) => changeAddedAppointment({ change: { title: target.value } })}
                    />
                    <TextField
                      label="Start Date"
                      type="datetime-local"
                      value={addedAppointment.startDate || ''}
                      onChange={({ target }) => changeAddedAppointment({ change: { startDate: target.value } })}
                    />
                    {addedAppointment.startDate && addedAppointment.startDate.toString()}
                    <TextField
                      label="End Date"
                      type="datetime-local"
                      value={addedAppointment.endDate || ''}
                      onChange={({ target }) => changeAddedAppointment({ change: { endDate: target.value } })}
                    />
                    {addedAppointment.endDate && addedAppointment.endDate.toString()}
                  </React.Fragment>
                )}
              </Paper>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      openForm: false,
      addedAppointment: {},
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onOpenButtonClick = this.onOpenButtonClick.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
  }

  onOpenButtonClick() {
    const { openForm: open } = this.state;
    this.setState({ openForm: !open });
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  commitChanges({ deleted, added }) {
    let { data } = this.state;
    if (deleted) {
      data = data.filter(appointment => deleted !== appointment.id);
    }
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        ...[{
          ...added,
          id: startingAddedId,
        }],
      ];
    }
    this.setState({ data });
  }

  render() {
    const { data, openForm, addedAppointment } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          getId={getId}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
            // addedAppointment={addedAppointment}
            // onAddedAppointmentChange={this.changeAddedAppointment}
          // disableAdding
          // disableDeleting
          />

          <WeekView
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments />

          <AppointmentTooltip
            showCloseButton
            showDeleteButton
          />
          <EditingForm />
        </Scheduler>
      </Paper>
    );
  }
}
