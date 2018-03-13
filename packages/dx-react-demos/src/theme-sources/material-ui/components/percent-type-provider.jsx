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

const EditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const targetValue = parseFloat(event.target.value / 100);
    onValueChange(Math.min(Math.max(targetValue, 0), 1));
  };
  return (
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
      onChange={handleChange}
    />
  );
};

EditorBase.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const Editor = withStyles(styles)(EditorBase);

export const PercentTypeProvider = props => (
  <DataTypeProvider
    editorComponent={Editor}
    {...props}
  />
);
