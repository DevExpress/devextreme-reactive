import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  YEARLY_RADIO_GROUP,
  NUMBER_EDITOR,
  getRecurrenceOptions,
  changeRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    width: '50%',
  },
  label: {
    width: '6.5em',
  },
  textEditor: {
    width: 'calc((100% - 7.5em) * 3 / 7)',
    maxWidth: '6em',
  },
  grid: {
    marginTop: theme.spacing(1.75),
  },
  labelWithMargin: {
    marginLeft: '1em',
    width: 'calc((100% - 7.5em) * 4 / 7)',
  },
  radioGroup: {
    marginTop: theme.spacing(1),
  },
});

const YearlyBase = ({
  radioGroupComponent: RadioGroup,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  classes,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  selectComponent,
  buttonGroupComponent,
  formatDate,
  ...restProps
}) => {
  const { rRule } = changedAppointment;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule), [rRule]);

  const changeRecurrenceInterval = React.useCallback(interval => onAppointmentFieldChange({
    rRule: changeRecurrenceOptions({ ...recurrenceOptions, interval }),
  }), [recurrenceOptions]);
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
          onValueChange={changeRecurrenceInterval}
        />
        <Label
          label={getMessage('yearsLabel')}
          className={classes.labelWithMargin}
        />
      </Grid>
      <RadioGroup
        id={YEARLY_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={TextEditor}
        labelComponent={Label}
        onAppointmentFieldChange={onAppointmentFieldChange}
        changedAppointment={changedAppointment}
        selectComponent={selectComponent}
        formatDate={formatDate}
        className={classes.radioGroup}
      />

    </div>
  );
};

YearlyBase.propTypes = {
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
  formatDate: PropTypes.func.isRequired,
};

YearlyBase.defaultProps = {
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Yearly = withStyles(styles)(YearlyBase, { name: 'Yearly' });
