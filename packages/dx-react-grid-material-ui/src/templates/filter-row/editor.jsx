import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

const styles = ({ spacing }) => ({
  input: {
    width: `calc(100% - ${spacing.unit * 6}px)`,
  },
});

const EditorBase = ({
  value, disabled, getMessage, onChange,
  className, classes,
  ...restProps
}) => (
  <Input
    className={classNames(classes.input, className)}
    disabled={disabled}
    value={value}
    onChange={onChange}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

EditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func,
};

EditorBase.defaultProps = {
  className: undefined,
  value: '',
  disabled: false,
  onChange: () => {},
  getMessage: PropTypes.func.isRequired,
};

export const Editor = withStyles(styles)(EditorBase);
