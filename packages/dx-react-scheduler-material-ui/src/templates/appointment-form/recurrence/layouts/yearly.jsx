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
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  onRecurrenceOptionsChange,
  changeAppointment,
  classes,
  className,
  getMessage,
  readOnly,
  recurrenceOptions,
  ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
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
  </div>
);

LayoutBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
