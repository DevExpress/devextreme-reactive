import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NUMBER_EDITOR, getRecurrenceOptions } from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    width: '7em',
  },
  textEditor: {
    width: '6em',
  },
  grid: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1.75),
  },
  labelWithMargin: {
    width: '7em',
    marginLeft: theme.spacing(1.75),
  },
});

const WeeklyBase = ({
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
  formatDate,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  return (
    <div
      {...restProps}
    >
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
          label={getMessage('weeksOnLabel')}
          className={classes.labelWithMargin}
        />
      </Grid>
      <GroupedButtons
        changedAppointment={changedAppointment}
        onRecurrenceOptionsChange={onRecurrenceOptionsChange}
        readOnly={readOnly}
        formatDate={formatDate}
      />
    </div>
  );
};

WeeklyBase.propTypes = {
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

WeeklyBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Weekly = withStyles(styles)(WeeklyBase, { name: 'Weekly' });
