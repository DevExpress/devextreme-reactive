import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NUMBER_EDITOR, getRecurrenceOptions, changeRecurrenceOptions } from '@devexpress/dx-scheduler-core';

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
  radioGroupComponent,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  classes,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  selectComponent,
  buttonGroupComponent: ButtonGroup,
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
          onValueChange={value => onAppointmentFieldChange({
            rRule: changeRecurrenceOptions({
              ...recurrenceOptions, interval: value,
            }),
          })}
        />
        <Label
          label={getMessage('weeksOnLabel')}
          className={classes.labelWithMargin}
        />
      </Grid>
      <ButtonGroup
        changedAppointment={changedAppointment}
        onAppointmentFieldChange={onAppointmentFieldChange}
        readOnly={readOnly}
        formatDate={formatDate}
      />
    </div>
  );
};

WeeklyBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  buttonGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.object.isRequired,
  onAppointmentFieldChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  formatDate: PropTypes.func.isRequired,
};

WeeklyBase.defaultProps = {
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Weekly = withStyles(styles)(WeeklyBase, { name: 'Weekly' });
