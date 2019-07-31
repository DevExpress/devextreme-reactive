import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    width: '50%',
  },
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const handleIntervalChange = (options, newInterval, action) => {
  const newOptions = { ...options, interval: newInterval };
  action(newOptions);
};

const LayoutBase = ({
  recurrenceSwitcherComponent: RecurenceSwitcher,
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  onRecurrenceOptionsChange,
  changeAppointment,
  frequency,
  children,
  classes,
  className,
  onRRuleChange,
  style,
  getMessage,
  readOnly,
  recurrenceOptions,
  ...restProps
}) => {
  if (recurrenceOptions) {
    return (
      <div
        className={classNames(classes.root, className)}
        // style={{ ...layoutStyle, ...style }}
        {...restProps}
      >
        <Label
          label={getMessage('repeatLabel')}
        />
        <RecurenceSwitcher />
        <Grid
          container
          direction="row"
          justify="flex-start"
        >
          <Label
            label={getMessage('repeatEveryLabel')}
            className={classes.label}
          />
          <TextEditor
            readOnly={readOnly}
            value={recurrenceOptions.interval}
            className={classes.textEditor}
            {...changeAppointment && {
              onValueChange: value => handleIntervalChange(
                recurrenceOptions, value, onRecurrenceOptionsChange,
              ),
            }}
          />
          <Label
            label={getMessage('daysLabel')}
            className={classes.label}
          />
        </Grid>
        <Label
          label={getMessage('endRepeatLabel')}
        />
        <RadioGroupEditor
          getMessage={getMessage}
          textEditorComponent={TextEditor}
          labelComponent={Label}
          recurrenceOptions={recurrenceOptions}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          dateAndTimeEditorComponent={DateAndTimeEditor}
        />
      </div>
    );
  }
  return null;
};

LayoutBase.propTypes = {
  recurrenceSwitcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func.isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  recurrenceEditing: PropTypes.bool.isRequired,
  style: PropTypes.object,
  onRRuleChange: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
  style: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
