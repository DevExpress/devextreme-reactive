import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const styles = {
  inputRoot: {
    width: '100%',
  },
  numericInput: {
    textAlign: 'right',
  },
};

const FloatEditorBase = ({ value, onValueChange, classes }) => (
  <Input
    type="number"
    classes={{
      root: classes.inputRoot,
      input: classes.numericInput,
    }}
    value={(value * 100).toFixed(1)}
    inputProps={{
      step: 0.1,
      min: 0,
      max: 100,
    }}
    onChange={e => onValueChange(parseFloat(e.target.value / 100))}
  />
);

FloatEditorBase.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const FloatEditor = withStyles(styles)(FloatEditorBase);

export const FloatTypeProvider = props => (
  <DataTypeProvider
    editorComponent={FloatEditor}
    {...props}
  />
);
