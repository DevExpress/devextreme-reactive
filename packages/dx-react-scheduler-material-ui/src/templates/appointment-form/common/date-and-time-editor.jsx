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
    paddingBottom: spacing(1.5),
  },
  full: {
    width: '45%',
  },
  divider: {
    ...typography.body2,
    width: '10%',
    textAlign: 'center',
  },
  partial: {
    width: '100%',
    marginTop: spacing(1.5),
  },
});

const DateAndTimeEditorBase = ({
  classes,
  onFirstDateValueChange,
  onSecondDateValueChange,
  firstDate,
  secondDate,
  id,
  disabled,
  ...restProps
}) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Grid
      container
      alignItems="center"
      {...restProps}
    >
      <KeyboardDateTimePicker
        disabled={disabled}
        className={classNames({
          [classes.full]: id === FULL_DATE_TIME_EDITOR,
          [classes.partial]: id === PARTIAL_DATE_TIME_EDITOR,
          [classes.dateEditor]: true,
        })}
        margin="normal"
        value={firstDate}
        onChange={onFirstDateValueChange}
        format="DD/MM/YYYY HH:mm A"
        inputVariant="filled"
        hiddenLabel
      />
      {
        id === FULL_DATE_TIME_EDITOR && (
          <React.Fragment>
            <Typography
              className={classes.divider}
            >
              {'–'}
            </Typography>
            <KeyboardDateTimePicker
              disabled={disabled}
              className={classNames(classes.full, classes.dateEditor)}
              margin="normal"
              value={secondDate}
              onChange={onSecondDateValueChange}
              format="DD/MM/YYYY HH:mm A"
              inputVariant="filled"
              hiddenLabel
            />
          </React.Fragment>
        )
      }
    </Grid>
  </MuiPickersUtilsProvider>
);

DateAndTimeEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  firstDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  secondDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onFirstDateValueChange: PropTypes.func,
  onSecondDateValueChange: PropTypes.func,
  id: PropTypes.string,
};

DateAndTimeEditorBase.defaultProps = {
  firstDate: undefined,
  secondDate: undefined,
  className: undefined,
  onFirstDateValueChange: () => undefined,
  onSecondDateValueChange: () => undefined,
  disabled: false,
  id: PARTIAL_DATE_TIME_EDITOR,
};

export const DateAndTimeEditor = withStyles(styles)(DateAndTimeEditorBase, { name: 'DateAndTimeEditor' });
