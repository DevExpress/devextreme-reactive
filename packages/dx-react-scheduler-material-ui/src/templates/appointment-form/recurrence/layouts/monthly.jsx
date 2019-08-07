import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  MONTHLY_RADIO_GROUP,
  NUMBER_EDITOR,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    width: '50%',
  },
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const handleIntervalChange = (options, newInterval, action) => {
  const newOptions = { ...options, interval: newInterval };
  action(newOptions);
};

const LayoutBase = ({
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  onRecurrenceOptionsChange,
  classes,
  getMessage,
  readOnly,
  recurrenceOptions,
  changeAppointmentField,
  changedAppointment,
  switcherComponent: Switcher,
  ...restProps
}) => (
  <div {...restProps}>
    <Grid
      container
      direction="row"
      justify="flex-start"
    >
      <Label
        label={getMessage('repeatEveryLabel')}
        className={classes.label}
      />
      <TextEditor
        readOnly={readOnly}
        value={recurrenceOptions.interval}
        className={classes.textEditor}
        id={NUMBER_EDITOR}
        onValueChange={value => handleIntervalChange(
          recurrenceOptions, value, onRecurrenceOptionsChange,
        )}
      />
      <Label
        label={getMessage('monthsLabel')}
        className={classes.label}
      />
    </Grid>
    <RadioGroupEditor
      id={MONTHLY_RADIO_GROUP}
      readOnly={readOnly}
      getMessage={getMessage}
      textEditorComponent={TextEditor}
      labelComponent={Label}
      recurrenceOptions={recurrenceOptions}
      onRecurrenceOptionsChange={onRecurrenceOptionsChange}
      changeAppointmentField={changeAppointmentField}
      changedAppointment={changedAppointment}
      switcherComponent={Switcher}
    />

  </div>
);

LayoutBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  changeAppointmentField: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  changeAppointmentField: () => undefined,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
