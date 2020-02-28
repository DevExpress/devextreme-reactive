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

const currentDate = '2018-06-27';
const editingFeaturesList = [
  { id: 'allowAdding', text: 'Allow Adding' },
  { id: 'allowDeleting', text: 'Allow Deleting' },
  { id: 'allowUpdating', text: 'Allow Updating' },
  { id: 'allowResizing', text: 'Allow Resizing' },
  { id: 'allowDragging', text: 'Allow Dragging' },
];

const Demo = () => {
  const [data, setData] = React.useState(appointments);
  const [editingFeatures, setEditingFeatures] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowResizing: true,
    allowDragging: false,
  });
  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingFeatures;

  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
    }
  });
  const handleEditingFeaturesChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingFeatures;
    setEditingFeatures({
      ...editingFeatures,
      [value]: !checked,
    });
  });
  // console.log(editingFeatures)

  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => {
    return <WeekView.TimeTableCell {...restProps} onDoubleClick={allowAdding ? onDoubleClick : undefined} />;
  }), [allowAdding]);

  const FormCommandLayout = React.useCallback(({ ...restProps }) => {
    return <AppointmentForm.CommandLayout {...restProps} readOnly={false} />;
  }, []);

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    if (id === 'saveButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowUpdating} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting, allowUpdating]);

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox checked={allowAdding} onChange={handleEditingFeaturesChange} value="allowAdding" />
          }
          label="Allow Adding"
        />
        <FormControlLabel
          control={
            <Checkbox checked={allowDeleting} onChange={handleEditingFeaturesChange} value="allowDeleting" />
          }
          label="Allow Deleting"
        />
        <FormControlLabel
          control={
            <Checkbox checked={allowUpdating} onChange={handleEditingFeaturesChange} value="allowUpdating" />
          }
          label="Allow Updating"
        />
        <FormControlLabel
          control={
            <Checkbox checked={allowDragging} onChange={handleEditingFeaturesChange} value="allowDragging" />
          }
          label="Allow Dragging"
        />
        <FormControlLabel
          control={
            <Checkbox checked={allowResizing} onChange={handleEditingFeaturesChange} value="allowResizing" />
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
            onCommitChanges={onCommitChanges}
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
};

export default Demo;
