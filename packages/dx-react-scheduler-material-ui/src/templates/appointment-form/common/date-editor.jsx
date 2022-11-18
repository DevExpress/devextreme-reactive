import * as React from 'react';
import PropTypes from 'prop-types';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateEditorBase = React.memo(({
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
        disabled={readOnly}
        renderInput={props => <TextField className={className} margin="normal" {...props} />}
        value={value}
        onChange={memoizedChangeHandler}
        inputFormat={dateFormat}
        {...restProps}
      />
    </LocalizationProvider>
  );
});

DateEditorBase.propTypes = {
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

export const DateEditor = DateEditorBase;
