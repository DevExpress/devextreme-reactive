import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { NUMBER_EDITOR } from '@devexpress/dx-scheduler-core';

const styles = ({ spacing }) => ({
  textEditor: {
    width: '5em',
    marginLeft: spacing(2),
    marginRight: spacing(2),
  },
  label: {
    paddingTop: spacing(5),
  },
  input: {
    paddingBottom: spacing(2.75),
  },
});

const handleCountChange = (options, newCount, action) => {
  const newOptions = { ...options, count: newCount };
  action(newOptions);
};

const handleEndDateChange = (options, newEndDate, action) => {
  const newOptions = { ...options, until: newEndDate };
  action(newOptions);
};

const handleCountAndUntilChange = (options, newCount, newEndDate, action) => {
  const newOptions = { ...options, until: newEndDate, count: newCount };
  action(newOptions);
};

const EndRepeatEditorBase = ({
  classes,
  className,
  onExecute,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  recurrenceOptions,
  onRecurrenceOptionsChange,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  ...restProps
}) => {
  const recurrenceCount = recurrenceOptions.count || 1;
  const recurrenceEndDate = recurrenceOptions.until || new Date();
  let value;
  if (recurrenceOptions.count) {
    value = 'endAfter';
  } else if (recurrenceOptions.until) {
    value = 'endBy';
  } else value = 'never';

  const onRadioGroupValueChange = (event) => {
    switch (event.target.value) {
      case 'endAfter':
        handleCountAndUntilChange(recurrenceOptions, 1, undefined, onRecurrenceOptionsChange);
        break;
      case 'endBy':
        handleCountAndUntilChange(
          recurrenceOptions, undefined, new Date(), onRecurrenceOptionsChange,
        );
        break;
      default:
        handleCountAndUntilChange(
          recurrenceOptions, undefined, undefined, onRecurrenceOptionsChange,
        );
        break;
    }
  };
  return (
    <RadioGroup
      onChange={onRadioGroupValueChange}
      aria-label="gender"
      name="gender1"
      className={classNames(classes.group, className)}
      value={value}
      {...restProps}
    >
      <FormControlLabel value="never" control={<Radio />} label={getMessage('never')} />
      <FormControlLabel
        value="endAfter"
        control={<Radio />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
          >
            <Label
              className={classes.label}
              label={getMessage('onLabel')}
            />
            <TextEditor
              disabled={value !== 'endAfter'}
              className={classes.textEditor}
              InputProps={{
                className: classes.input,
              }}
              value={recurrenceCount}
              onValueChange={count => handleCountChange(
                recurrenceOptions, count, onRecurrenceOptionsChange,
              )}
              id={NUMBER_EDITOR}
            />
            <Label
              className={classes.label}
              label={getMessage('occurencesLabel')}
            />
          </Grid>
        )}
      />
      <FormControlLabel
        value="endBy"
        control={<Radio />}
        label={(
          <Grid
            container
            direction="row"
            justify="flex-start"
          >
            <Label
              className={classes.label}
              label={getMessage('afterLabel')}
            />
            <DateAndTimeEditor
              disabled={value !== 'endBy'}
              oneDate
              startDate={recurrenceEndDate}
              onStartDateValueChange={date => handleEndDateChange(
                recurrenceOptions,
                date,
                onRecurrenceOptionsChange,
              )}
            />
          </Grid>
        )}
      />
    </RadioGroup>
  );
};


EndRepeatEditorBase.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

EndRepeatEditorBase.defaultProps = {
  className: undefined,
};

export const EndRepeatEditor = withStyles(styles)(EndRepeatEditorBase, { name: 'EndRepeatEditor' });
