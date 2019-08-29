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
  onValueChange,
  value,
  readOnly,
  className,
  locale,
  ...restProps
}) => {
  const memoizedChangeHandler = React.useCallback(
    nextDate => nextDate && onValueChange(nextDate.toDate()),
  );
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
      <KeyboardDateTimePicker
        variant="inline"
        disabled={readOnly}
        className={classNames(classes.dateEditor, className)}
        margin="normal"
        value={value}
        onChange={memoizedChangeHandler}
        format="DD/MM/YYYY HH:mm A"
        inputVariant="filled"
        hiddenLabel
        {...restProps}
      />
    </MuiPickersUtilsProvider>
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
};

DateEditorBase.defaultProps = {
  locale: 'en-US',
  value: undefined,
  className: undefined,
  readOnly: false,
};

export const DateEditor = withStyles(styles)(DateEditorBase, { name: 'DateEditor' });
