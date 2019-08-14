import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { NUMBER_EDITOR, getRecurrenceOptions } from '@devexpress/dx-scheduler-core';

const styles = ({ spacing, typography }) => ({
  textEditor: {
    width: '15em',
    marginLeft: spacing(1.875),
    marginRight: spacing(2),
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
  inputAdornment: {
    paddingBottom: spacing(1.25),
  },
});

const EndRepeatEditorBase = ({
  classes,
  onExecute,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  onRecurrenceOptionsChange,
  dateAndTimeEditorComponent: DateAndTimeEditor,
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
        onRecurrenceOptionsChange({ ...recurrenceOptions, count, until: undefined });
        break;
      case 'endBy':
        setCount(recurrenceOptions.count || count);
        onRecurrenceOptionsChange({ ...recurrenceOptions, count: undefined, until: endDate });
        break;
      case 'never':
        setEndDate(recurrenceOptions.until || endDate);
        setCount(recurrenceOptions.count || count);
        onRecurrenceOptionsChange({ ...recurrenceOptions, count: undefined, until: undefined });
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
              onValueChange={newCount => onRecurrenceOptionsChange({
                ...recurrenceOptions,
                count: newCount,
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
            <DateAndTimeEditor
              className={classes.dateEditor}
              disabled={value !== 'endBy'}
              oneDate
              firstDate={recurrenceEndDate}
              onFirstDateValueChange={date => onRecurrenceOptionsChange({
                ...recurrenceOptions, until: date,
              })}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


EndRepeatEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  onExecute: PropTypes.func,
  getMessage: PropTypes.func,
  onRecurrenceOptionsChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

EndRepeatEditorBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  onExecute: () => undefined,
  getMessage: () => undefined,
};

export const EndRepeatEditor = withStyles(styles)(EndRepeatEditorBase, { name: 'EndRepeatEditor' });
