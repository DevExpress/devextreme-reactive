import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import {
  NUMBER_EDITOR, getRecurrenceOptions, changeRecurrenceOptions,
  checkIsNaturalNumber, isDateValid,
} from '@devexpress/dx-scheduler-core';

const styles = ({ spacing, typography }) => ({
  occurenceTextEditor: {
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '8em',
  },
  occurenceLabel: {
    marginLeft: '1em',
    width: 'calc((100% - 5.5em) * 4 / 7)',
  },
  label: {
    width: '4.5em',
  },
  input: {
    paddingBottom: spacing(2.75),
  },
  radioLabel: {
    fontSize: typography.fontSize + 1,
  },
  dateEditor: {
    width: 'calc(100% - 4.5em)',
  },
  formControl: {
    marginRight: 0,
  },
  controlLabel: {
    width: '100%',
  },
});

const EndRepeatEditorBase = ({
  classes,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  dateEditorComponent: DateEditor,
  onFieldChange,
  appointmentData,
  locale,
  readOnly,
  ...restProps
}) => {
  const [count, setCount] = React.useState(1);
  const [endDate, setEndDate] = React.useState(appointmentData.endDate);

  const { rRule } = appointmentData;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule) || {}, [rRule]);
  const changeRecurrenceCount = React.useCallback(
    nextCount => checkIsNaturalNumber(nextCount) && onFieldChange({
      rRule: changeRecurrenceOptions({ ...recurrenceOptions, count: nextCount }),
    }), [recurrenceOptions, onFieldChange],
  );
  const changeRecurrenceEndDate = React.useCallback((date) => {
    if(isDateValid(date)) {
      onFieldChange({
        rRule: changeRecurrenceOptions({ ...recurrenceOptions, until: date }),
      });
    }
  }, [recurrenceOptions, onFieldChange]);

  const recurrenceCount = recurrenceOptions.count || count;
  const recurrenceEndDate = recurrenceOptions.until || endDate;
  let value;
  if(recurrenceOptions.count) {
    value = 'endAfter';
  } else if(recurrenceOptions.until) {
    value = 'endBy';
  } else {
    value = 'never';
  }

  const onRadioGroupValueChange = (event) => {
    let change;
    switch(event.target.value) {
      case 'endAfter':
        setEndDate(recurrenceOptions.until || endDate);
        change = { count, until: undefined };
        break;
      case 'endBy':
        setCount(recurrenceOptions.count || count);
        change = { count: undefined, until: endDate };
        break;
      case 'never':
        setEndDate(recurrenceOptions.until || endDate);
        setCount(recurrenceOptions.count || count);
        change = { count: undefined, until: undefined };
        break;
      default:
        break;
    }
    onFieldChange({
      rRule: changeRecurrenceOptions({
        ...recurrenceOptions, ...change,
      }),
    });
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
        disabled={readOnly}
      />
      <FormControlLabel
        className={classes.formControl}
        value="endAfter"
        classes={{ label: classes.controlLabel }}
        control={<Radio color="primary" />}
        disabled={readOnly}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Label
              className={classes.label}
              text={getMessage('onLabel')}
            />
            <TextEditor
              readOnly={readOnly || value !== 'endAfter'}
              className={classes.occurenceTextEditor}
              value={recurrenceCount}
              type={NUMBER_EDITOR}
              onValueChange={changeRecurrenceCount}
            />
            <Label
              className={classes.occurenceLabel}
              text={getMessage('occurrencesLabel')}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        className={classes.formControl}
        classes={{ label: classes.controlLabel }}
        value="endBy"
        disabled={readOnly}
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
              text={getMessage('afterLabel')}
            />
            <DateEditor
              className={classes.dateEditor}
              readOnly={readOnly || value !== 'endBy'}
              value={recurrenceEndDate}
              onValueChange={changeRecurrenceEndDate}
              allowKeyboardControl={false}
              locale={locale}
              excludeTime={appointmentData.allDay}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};

EndRepeatEditorBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func,
  onFieldChange: PropTypes.func,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  readOnly: PropTypes.bool,
};

EndRepeatEditorBase.defaultProps = {
  onFieldChange: () => undefined,
  getMessage: () => undefined,
  readOnly: false,
};

export const EndRepeatEditor = withStyles(styles)(EndRepeatEditorBase, { name: 'EndRepeatEditor' });
