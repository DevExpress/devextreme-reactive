import * as React from 'react';
import * as PropTypes from 'prop-types';
import AdapterMoment from '@mui/lab/AdapterMoment';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const styles = ({ spacing }) => ({
  dateEditor: {
    paddingBottom: spacing(1.5),
  },
});

const DateEditorBase = React.memo(({
  classes,
  onValueChange,
  value,
  readOnly,
  className,
  locale,
  excludeTime,
  ...restProps
}) => {
  const memoizedChangeHandler = React.useCallback(
    nextDate => nextDate && onValueChange(nextDate.toDate()), [onValueChange],
  );
  const dateFormat = excludeTime ? 'DD/MM/YYYY' : 'DD/MM/YYYY hh:mm A';

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        className={classNames(classes.dateEditor, className)}
        disabled={readOnly}
        renderInput={props => <TextField margin="normal" variant="filled" {...props} />}
        value={value}
        onChange={memoizedChangeHandler}
        inputFormat={dateFormat}
        {...restProps}
      />
    </LocalizationProvider>
  );
});

DateEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  excludeTime: PropTypes.bool,
};

DateEditorBase.defaultProps = {
  locale: 'en-US',
  value: undefined,
  className: undefined,
  readOnly: false,
  excludeTime: false,
};

export const DateEditor = withStyles(styles)(DateEditorBase, { name: 'DateEditor' });
