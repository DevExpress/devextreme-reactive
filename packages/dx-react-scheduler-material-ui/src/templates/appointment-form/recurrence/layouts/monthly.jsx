import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  MONTHLY_RADIO_GROUP,
  NUMBER_EDITOR,
  getRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    width: '50%',
  },
  label: {
    width: '7em',
  },
  textEditor: {
    width: '6em',
  },
  grid: {
    marginTop: theme.spacing(1.75),
  },
});

const MonthlyBase = ({
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  onRecurrenceOptionsChange,
  classes,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  switcherComponent: Switcher,
  groupedButtonsComponent: GroupedButtons,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  return (
    <div {...restProps}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.grid}
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
          onValueChange={value => onRecurrenceOptionsChange({
            ...recurrenceOptions, interval: value,
          })}
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
        onRecurrenceOptionsChange={onRecurrenceOptionsChange}
        onAppointmentFieldChange={onAppointmentFieldChange}
        changedAppointment={changedAppointment}
        switcherComponent={Switcher}
      />
    </div>
  );
};

MonthlyBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupedButtonsComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

MonthlyBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Monthly = withStyles(styles)(MonthlyBase, { name: 'Monthly' });
