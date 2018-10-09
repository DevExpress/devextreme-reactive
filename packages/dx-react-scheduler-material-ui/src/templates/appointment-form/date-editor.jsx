import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  editor: {
    width: '100%',
  },
});

const DateEditorBase = ({
  classes,
  value,
  label,
  className,
  readOnly,
  onValueChange,
  ...restProps
}) => (
  <TextField
    label={label}
    className={classNames(classes.editor, className)}
    value={moment(value).format(moment.HTML5_FMT.DATETIME_LOCAL)}
    margin="normal"
    variant="filled"
    type="datetime-local"
    disabled={readOnly}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={({ target }) => onValueChange(target.value)}
    {...restProps}
  />
);

DateEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
};

DateEditorBase.defaultProps = {
  value: undefined,
  label: undefined,
  className: undefined,
  readOnly: false,
  onValueChange: () => undefined,
};

export const DateEditor = withStyles(styles)(DateEditorBase, { name: 'DateEditor' });
