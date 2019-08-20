import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { NUMBER_EDITOR, getRecurrenceOptions, changeRecurrenceOptions } from '@devexpress/dx-scheduler-core';

const styles = ({ spacing, typography }) => ({
  textEditor: {
    width: '15em',
    marginLeft: spacing(1.875),
  },
  label: {
    width: '4em',
  },
  input: {
    paddingBottom: spacing(2.75),
  },
  radioLabel: {
    fontSize: typography.fontSize + 1,
  },
  dateEditor: {
    width: '15em',
    marginLeft: spacing(1.875),
  },
});

const EndRepeatEditorBase = ({
  classes,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  dateEditorComponent: DateEditor,
  onAppointmentFieldChange,
  changedAppointment,
  ...restProps
}) => {
  const [count, setCount] = React.useState(1);
  const [endDate, setEndDate] = React.useState(changedAppointment.endDate);

  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  const recurrenceCount = recurrenceOptions.count || count;
  const recurrenceEndDate = recurrenceOptions.until || endDate;
  let value;
  if (recurrenceOptions.count) {
    value = 'endAfter';
  } else if (recurrenceOptions.until) {
    value = 'endBy';
  } else value = 'never';

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'endAfter':
        setEndDate(recurrenceOptions.until || endDate);
        onAppointmentFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions, count, until: undefined,
          }),
        });
        break;
      case 'endBy':
        setCount(recurrenceOptions.count || count);
        onAppointmentFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions, count: undefined, until: endDate,
          }),
        });
        break;
      case 'never':
        setEndDate(recurrenceOptions.until || endDate);
        setCount(recurrenceOptions.count || count);
        onAppointmentFieldChange({
          rRule: changeRecurrenceOptions({
            ...recurrenceOptions, count: undefined, until: undefined,
          }),
        });
        break;
      default:
        break;
    }
  };
  return (
    <RadioGroup
      onChange={onRadioGroupValueChange}
      value={value}
      {...restProps}
    >
      <FormControlLabel
        value="never"
        control={<Radio color="primary" />}
        label={getMessage('never')}
        classes={{ label: classes.radioLabel }}
      />
      <FormControlLabel
        value="endAfter"
        control={<Radio color="primary" />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Label
              className={classes.label}
              label={getMessage('onLabel')}
            />
            <TextEditor
              disabled={value !== 'endAfter'}
              className={classes.textEditor}
              value={recurrenceCount}
              id={NUMBER_EDITOR}
              onValueChange={newCount => onAppointmentFieldChange({
                rRule: changeRecurrenceOptions({
                  ...recurrenceOptions,
                  count: newCount,
                }),
              })}
              InputProps={{
                endAdornment: <InputAdornment className={classes.inputAdornment} position="end">{getMessage('occurencesLabel')}</InputAdornment>,
              }}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        value="endBy"
        control={<Radio color="primary" />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Label
              className={classes.label}
              label={getMessage('afterLabel')}
            />
            <DateEditor
              className={classes.dateEditor}
              disabled={value !== 'endBy'}
              date={recurrenceEndDate}
              onDateChange={date => onAppointmentFieldChange({
                rRule: changeRecurrenceOptions({
                  ...recurrenceOptions, until: date,
                }),
              })}
              allowKeyboardControl={false}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


EndRepeatEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  changedAppointment: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
};

EndRepeatEditorBase.defaultProps = {
  onAppointmentFieldChange: () => undefined,
  getMessage: () => undefined,
};

export const EndRepeatEditor = withStyles(styles)(EndRepeatEditorBase, { name: 'EndRepeatEditor' });
