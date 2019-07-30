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

const styles = ({ typography }) => ({
  editor: {
    width: '45%',
  },
  divider: {
    ...typography.body2,
    width: '10%',
    textAlign: 'center',
    transform: 'translate(0, 50%)',
  },
});

const DateAndTimeEditorBase = ({
  classes,
  label,
  className,
  readOnly,
  onStartDateValueChange,
  onEndDateValueChange,
  startDate,
  endDate,
  oneDate,
  ...restProps
}) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Grid container>
      <KeyboardDateTimePicker
        className={classNames(classes.editor, className)}
        margin="normal"
        value={startDate}
        onChange={onStartDateValueChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      {
        !oneDate && (
          <Typography
            className={classes.divider}
            {...restProps}
          >
            {'–'}
          </Typography>
        )
      }
      {
        !oneDate && (
          <KeyboardDateTimePicker
            className={classNames(classes.editor, className)}
            margin="normal"
            value={endDate}
            onChange={onEndDateValueChange}
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
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onStartDateValueChange: PropTypes.func,
  onEndDateValueChange: PropTypes.func,
  oneDate: PropTypes.bool,
};

DateAndTimeEditorBase.defaultProps = {
  startDate: undefined,
  endDate: undefined,
  label: undefined,
  className: undefined,
  readOnly: false,
  onStartDateValueChange: () => undefined,
  onEndDateValueChange: () => undefined,
  oneDate: false,

};

export const DateAndTimeEditor = withStyles(styles)(DateAndTimeEditorBase, { name: 'DateAndTimeEditor' });
