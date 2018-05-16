import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const styles = {
  inputRoot: {
    width: '100%',
  },
  numericInput: {
    textAlign: 'right',
  },
};

const getInputValue = value => (value === undefined ? '' : (value * 100).toFixed(1));

const EditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue === '') {
      onValueChange();
      return;
    }
    onValueChange(Math.min(Math.max(parseFloat(targetValue / 100), 0), 1));
  };
  return (
    <Input
      type="number"
      classes={{
        root: classes.inputRoot,
        input: classes.numericInput,
      }}
      value={getInputValue(value)}
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
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

EditorBase.defaultProps = {
  value: undefined,
};

const Editor = withStyles(styles)(EditorBase);

export const PercentTypeProvider = props => (
  <DataTypeProvider
    editorComponent={Editor}
    {...props}
  />
);
