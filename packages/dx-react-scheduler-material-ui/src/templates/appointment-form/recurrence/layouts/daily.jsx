import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  NUMBER_EDITOR,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const DailyBase = ({
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  onRecurrenceOptionsChange,
  classes,
  getMessage,
  readOnly,
  recurrenceOptions,
  onAppointmentFieldChange,
  changedAppointment,
  switcherComponent: Switcher,
  booleanEditorComponent,
  ...restProps
}) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    {...restProps}
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
      onValueChange={value => onRecurrenceOptionsChange({ ...recurrenceOptions, interval: value })}
    />
    <Label
      label={getMessage('daysLabel')}
      className={classes.label}
    />
  </Grid>
);

DailyBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  booleanEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  recurrenceOptions: PropTypes.object.isRequired,
};

DailyBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Daily = withStyles(styles)(DailyBase, { name: 'Daily' });
