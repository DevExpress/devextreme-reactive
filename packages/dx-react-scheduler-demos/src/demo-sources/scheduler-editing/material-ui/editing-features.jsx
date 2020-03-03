import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';
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

const styles = theme => ({
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `2px solid ${lighten(fade(theme.palette.divider, 1), 0.8)}`,
  },
  text: theme.typography.h6,
});

const currentDate = '2018-06-27';
const editingOptionsList = [
  { id: 'allowAdding', text: 'Allow Adding' },
  { id: 'allowDeleting', text: 'Allow Deleting' },
  { id: 'allowUpdating', text: 'Allow Updating' },
  { id: 'allowResizing', text: 'Allow Resizing' },
  { id: 'allowDragging', text: 'Allow Dragging' },
];

const EditingOptionsSelector = withStyles(styles, 'EditingOptionsSelector')(({
  editingOptions, handleEditingOptionsChange, classes,
}) => (
  <div className={classes.container}>
    <Typography className={classes.text}>
      Options
    </Typography>
    <FormGroup row>
      {editingOptionsList.map(({ id, text }) => (
        <FormControlLabel
          control={(
            <Checkbox
              checked={editingOptions[id]}
              onChange={handleEditingOptionsChange}
              value={id}
              color="primary"
            />
          )}
          label={text}
          key={id}
          disabled={(id === 'allowDragging' || id === 'allowResizing') && !editingOptions.allowUpdating}
        />
      ))}
    </FormGroup>
  </div>
));

export default () => {
  const [data, setData] = React.useState(appointments);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingOptions;

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
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    });
  });

  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  )), [allowAdding]);

  const FormCommandLayout = React.useCallback(({ ...restProps }) => (
    <AppointmentForm.CommandLayout {...restProps} readOnly={false} />
  ), []);

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    if (id === 'saveButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowUpdating} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting, allowUpdating]);

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating, [allowDragging, allowUpdating],
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating, [allowResizing, allowUpdating],
  );

  return (
    <>
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
            allowDrag={allowDrag}
            allowResize={allowResize}
          />
        </Scheduler>
      </Paper>
      <EditingOptionsSelector
        editingOptions={editingOptions}
        handleEditingOptionsChange={handleEditingOptionsChange}
      />
    </>
  );
};
