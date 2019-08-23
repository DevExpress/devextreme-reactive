import * as React from 'react';
import * as PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const styles = ({ spacing }) => ({
  dateEditor: {
    paddingBottom: spacing(1.5),
  },
});

const DateEditorBase = React.memo(({
  classes,
  onDateChange,
  date,
  disabled,
  className,
  ...restProps
}) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <KeyboardDateTimePicker
      disabled={disabled}
      className={classNames(classes.dateEditor, className)}
      margin="normal"
      value={date}
      onChange={nextDate => (nextDate ? onDateChange(nextDate.toDate()) : onDateChange(date))}
      format="DD/MM/YYYY HH:mm A"
      inputVariant="filled"
      hiddenLabel
      onError={() => null}
      {...restProps}
    />
  </MuiPickersUtilsProvider>
));

DateEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onDateChange: PropTypes.func,
};

DateEditorBase.defaultProps = {
  date: undefined,
  className: undefined,
  onDateChange: () => undefined,
  disabled: false,
};

export const DateEditor = withStyles(styles)(DateEditorBase, { name: 'DateEditor' });
