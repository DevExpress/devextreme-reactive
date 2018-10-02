import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    width: '100%',
  },
});

const PickerBase = ({ classes }) => {
  return (
    <TextField
      id="datetime-local"
      type="datetime-local"
      defaultValue="2017-05-24T10:30"
      className={classes.textField}
      variant="filled"
      label="Start Date"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export const Picker = withStyles(styles)(PickerBase);
