import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Button } from '@material-ui/core/Button';

const styles = ({ spacing, palette }) => ({
  button: {
    height: spacing(3.5),
    padding: spacing(0.5),
  },
});

const RadioGroupEditorBase = ({
  classes,
  className,
  onExecute,
  value,
  ...restProps
}) => {
  return (
    <RadioGroup
      aria-label="gender"
      name="gender1"
      className={classNames(classes.group, className)}
      value="female"
      onChange={console.log('hello')}
      {...restProps}
    >
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
  );
};

RadioGroupEditorBase.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

RadioGroupEditorBase.defaultProps = {
  className: undefined,
};

export const RadioGroupEditor = withStyles(styles)(RadioGroupEditorBase, { name: 'RadioGroupEditor' });
