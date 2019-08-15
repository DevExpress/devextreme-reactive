import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {
  NUMBER_EDITOR,
  getRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';

const styles = ({ spacing }) => ({
  label: {
    width: '7em',
  },
  labelWithMargin: {
    width: '7em',
    marginLeft: spacing(1.75),
  },
  textEditor: {
    width: '6em',
  },
  grid: {
    marginTop: spacing(1.75),
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
  onAppointmentFieldChange,
  changedAppointment,
  switcherComponent: Switcher,
  groupedButtonsComponent: GroupedButtons,
  className,
  formatDate,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classNames(classes.grid, className)}
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
        onValueChange={value => onRecurrenceOptionsChange({
          ...recurrenceOptions, interval: value,
        })}
      />
      <Label
        label={getMessage('daysLabel')}
        className={classes.labelWithMargin}
      />
    </Grid>
  );
};

DailyBase.propTypes = {
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

DailyBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Daily = withStyles(styles)(DailyBase, { name: 'Daily' });
