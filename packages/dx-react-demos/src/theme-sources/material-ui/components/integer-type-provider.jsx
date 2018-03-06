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

const IntegerEditorBase = ({ value, onValueChange, classes }) => (
  <Input
    type="number"
    classes={{
      root: classes.inputRoot,
      input: classes.numericInput,
    }}
    value={value}
    inputProps={{
      step: 100,
      min: 0,
    }}
    onChange={e => onValueChange(parseInt(e.target.value, 10))}
  />
);

IntegerEditorBase.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const IntegerEditor = withStyles(styles)(IntegerEditorBase);

export const IntegerTypeProvider = props => (
  <DataTypeProvider
    editorComponent={IntegerEditor}
    {...props}
  />
);
