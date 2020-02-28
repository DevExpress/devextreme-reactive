import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      allowAdding: true,
      allowDeleting: true,
      allowUpdating: true,
      allowResizing: true,
      allowDragging: true,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.handleEditingFeatureChange = this.handleEditingFeatureChange.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  handleEditingFeatureChange({ target }) {
    const { value } = target;
    const { [value]: checked } = this.state;
    this.setState({
      [value]: !checked,
    });
  }

  render() {
    const {
      currentDate, data, allowAdding, allowDeleting,
      allowUpdating, allowDragging, allowResizing,
    } = this.state;

    const TimeTableCell = ({ onDoubleClick, ...restProps }) => {
      return <WeekView.TimeTableCell {...restProps} onDoubleClick={allowAdding ? onDoubleClick : undefined} />;
    };

    const FormCommandLayout = ({ ...restProps }) => {
      return <AppointmentForm.CommandLayout {...restProps} readOnly={false} />;
    };

    const CommandButton = ({ id, ...restProps }) => {
      if (id === 'deleteButton') {
        return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
      }
      if (id === 'saveButton') {
        return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowUpdating} />;
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    };

    return (
      <>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={allowAdding} onChange={this.handleEditingFeatureChange} value="allowAdding" />
            }
            label="Allow Adding"
          />
          <FormControlLabel
            control={
              <Checkbox checked={allowDeleting} onChange={this.handleEditingFeatureChange} value="allowDeleting" />
            }
            label="Allow Deleting"
          />
          <FormControlLabel
            control={
              <Checkbox checked={allowUpdating} onChange={this.handleEditingFeatureChange} value="allowUpdating" />
            }
            label="Allow Updating"
          />
          <FormControlLabel
            control={
              <Checkbox checked={allowDragging} onChange={this.handleEditingFeatureChange} value="allowDragging" />
            }
            label="Allow Dragging"
          />
          <FormControlLabel
            control={
              <Checkbox checked={allowResizing} onChange={this.handleEditingFeatureChange} value="allowResizing" />
            }
            label="Allow Resizing"
          />
        </FormGroup>
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              currentDate={currentDate}
            />
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <IntegratedEditing />
            <WeekView
              startDayHour={9}
              endDayHour={19}
              timeTableCellComponent={TimeTableCell}
            />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton={allowDeleting}
            />
            <AppointmentForm
              commandLayoutComponent={FormCommandLayout}
              commandButtonComponent={CommandButton}
              readOnly={!allowUpdating}
            />
            <DragDropProvider
              allowDrag={() => allowDragging && allowUpdating}
              allowResize={() => allowResizing && allowUpdating}
            />
          </Scheduler>
        </Paper>
      </>
    );
  }
}
