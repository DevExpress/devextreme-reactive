import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {
  NUMBER_EDITOR,
  getRecurrenceOptions,
  changeRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';

const styles = ({ spacing }) => ({
  label: {
    width: '6.5em',
  },
  labelWithMargin: {
    marginLeft: '1em',
    width: 'calc((100% - 7.5em) * 4 / 7)',
  },
  textEditor: {
    width: 'calc((100% - 7.5em) * 3 / 7)',
    maxWidth: '6em',
  },
  grid: {
    marginTop: spacing(1.75),
  },
});

const DailyBase = ({
  radioGroupComponent,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  classes,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  selectComponent,
  buttonGroupComponent,
  className,
  formatDate,
  ...restProps
}) => {
  const { rRule } = changedAppointment;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule), [rRule]);

  const changeRecurrenceInterval = React.useCallback(interval => onAppointmentFieldChange({
    rRule: changeRecurrenceOptions({ ...recurrenceOptions, interval }),
  }), [recurrenceOptions, onAppointmentFieldChange]);
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
        onValueChange={changeRecurrenceInterval}
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
  radioGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  buttonGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  onAppointmentFieldChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  formatDate: PropTypes.func.isRequired,
};

DailyBase.defaultProps = {
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
  className: undefined,
};

export const Daily = withStyles(styles)(DailyBase, { name: 'Daily' });
