import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

const styles = ({ spacing }) => ({
  input: {
    width: `calc(100% - ${spacing.unit * 6}px)`,
  },
});

const EditorBase = ({
  value, disabled, getMessage, onChange, classes,
}) => (
  <Input
    className={classes.input}
    disabled={disabled}
    value={value}
    onChange={onChange}
    placeholder={getMessage('filterPlaceholder')}
  />
);

EditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func,
};

EditorBase.defaultProps = {
  value: '',
  disabled: false,
  onChange: () => {},
  getMessage: PropTypes.func.isRequired,
};

export const Editor = withStyles(styles)(EditorBase);
