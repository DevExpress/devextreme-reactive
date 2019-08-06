import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { FULL_DATE_TIME_EDITOR, PARTIAL_DATE_TIME_EDITOR } from '@devexpress/dx-scheduler-core';

const styles = ({ typography, spacing }) => ({
  dateEditor: {
    paddingTop: spacing(1.5),
  },
  full: {
    width: '45%',
  },
  divider: {
    ...typography.body2,
    width: '10%',
    textAlign: 'center',
    transform: 'translate(0, 50%)',
  },
  partial: {
    width: '100%',
  },
});

const DateAndTimeEditorBase = ({
  classes,
  className,
  readOnly,
  onStartDateValueChange,
  onEndDateValueChange,
  startDate,
  endDate,
  id,
  disabled,
  ...restProps
}) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Grid container>
      <KeyboardDateTimePicker
        disabled={disabled}
        className={classNames({
          [classes.full]: id === FULL_DATE_TIME_EDITOR,
          [classes.partial]: id === PARTIAL_DATE_TIME_EDITOR,
          [classes.dateEditor]: true,
        })}
        margin="normal"
        value={startDate}
        onChange={onStartDateValueChange}
        format="DD/MM/YYYY HH:mm a"
        variant="inline"
        readOnly={readOnly}
        {...restProps}
      />
      {
        id === FULL_DATE_TIME_EDITOR && (
          <Typography
            className={classes.divider}
            {...restProps}
          >
            {'–'}
          </Typography>
        )
      }
      {
        id === FULL_DATE_TIME_EDITOR && (
          <KeyboardDateTimePicker
            disabled={disabled}
            className={classNames(classes.full, classes.dateEditor, className)}
            margin="normal"
            value={endDate}
            onChange={onEndDateValueChange}
            format="DD/MM/YYYY HH:mm a"
            variant="inline"
            readOnly={readOnly}
            {...restProps}
          />
        )
      }

    </Grid>
  </MuiPickersUtilsProvider>
);

DateAndTimeEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onStartDateValueChange: PropTypes.func,
  onEndDateValueChange: PropTypes.func,
  id: PropTypes.string,
};

DateAndTimeEditorBase.defaultProps = {
  startDate: undefined,
  endDate: undefined,
  className: undefined,
  readOnly: false,
  onStartDateValueChange: () => undefined,
  onEndDateValueChange: () => undefined,
  disabled: false,
  id: PARTIAL_DATE_TIME_EDITOR,
};

export const DateAndTimeEditor = withStyles(styles)(DateAndTimeEditorBase, { name: 'DateAndTimeEditor' });
