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

const EditorBase = ({ value, onValueChange, classes }) => (
  <Input
    type="number"
    classes={{
      root: classes.inputRoot,
      input: classes.numericInput,
    }}
    value={value}
    inputProps={{
      min: 0,
    }}
    onChange={e => onValueChange(parseInt(e.target.value, 10))}
  />
);

EditorBase.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const Editor = withStyles(styles)(EditorBase);

const Formatter = ({ value }) => `$${value}`;

export const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    {...props}
  />
);
