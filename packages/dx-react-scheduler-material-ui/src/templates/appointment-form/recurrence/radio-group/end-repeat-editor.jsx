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
        onRecurrenceOptionsChange({ ...recurrenceOptions, count: 1, until: undefined });
        break;
      case 'endBy':
        onRecurrenceOptionsChange({ ...recurrenceOptions, count: undefined, until: new Date() });
        break;
      default:
        onRecurrenceOptionsChange({ ...recurrenceOptions, count: undefined, until: undefined });
        break;
    }
  };
  return (
    <RadioGroup
      onChange={onRadioGroupValueChange}
      className={classNames(classes.group, className)}
      value={value}
      {...restProps}
    >
      <FormControlLabel value="never" control={<Radio color="primary" />} label={getMessage('never')} />
      <FormControlLabel
        value="endAfter"
        control={<Radio color="primary" />}
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
              id={NUMBER_EDITOR}
              onValueChange={count => onRecurrenceOptionsChange({ ...recurrenceOptions, count })}
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
        control={<Radio color="primary" />}
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
              onStartDateValueChange={date => onRecurrenceOptionsChange({
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
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func,
  getMessage: PropTypes.func,
  onRecurrenceOptionsChange: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

EndRepeatEditorBase.defaultProps = {
  className: undefined,
  onRecurrenceOptionsChange: () => undefined,
  onExecute: () => undefined,
  getMessage: () => undefined,
};

export const EndRepeatEditor = withStyles(styles)(EndRepeatEditorBase, { name: 'EndRepeatEditor' });
