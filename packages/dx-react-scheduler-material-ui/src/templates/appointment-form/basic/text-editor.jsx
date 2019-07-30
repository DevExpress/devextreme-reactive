import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ typography }) => ({
  editor: {
    width: '100%',
  },
  title: {
    ...typography.h6,
  },
});

const TextEditorBase = ({
  classes,
  value,
  label,
  className,
  readOnly,
  onValueChange,
  isTitle,
  notes,
  style,
  ...restProps
}) => (
  <TextField
    label={label}
    className={classNames({
      [classes.editor]: true,
    },
    className)}
    value={value}
    margin="normal"
    variant={notes ? 'outlined' : 'filled'}
    disabled={readOnly}
    onChange={({ target }) => onValueChange(target.value)}
    InputProps={{
      className: classNames({
        [classes.title]: isTitle,
      }),
    }}
    multiline={notes}
    rows="4"
    {...restProps}
  />
);


TextEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
  isTitle: PropTypes.bool,
  style: PropTypes.object,
  notes: PropTypes.bool,
};

TextEditorBase.defaultProps = {
  value: '',
  label: undefined,
  className: undefined,
  readOnly: false,
  onValueChange: () => undefined,
  isTitle: false,
  style: null,
  notes: false,
};

export const TextEditor = withStyles(styles)(TextEditorBase, { name: 'TextEditor' });
