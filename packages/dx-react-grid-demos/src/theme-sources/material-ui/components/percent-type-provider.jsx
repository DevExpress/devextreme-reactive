import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const PREFIX = 'Demo';
const classes = {
  numericInput: `${PREFIX}-numericInput`,
};
const StyledInput = styled(Input)(() => ({
  [`& .${classes.numericInput}`]: {
    textAlign: 'right',
    width: '100%',
  },
}));

const getInputValue = value => (value === undefined ? '' : (value * 100).toFixed(1));

const Formatter = ({ value }) => `${getInputValue(value)}%`;

const Editor = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue === '') {
      onValueChange();
      return;
    }
    onValueChange(Math.min(Math.max(parseFloat(targetValue / 100), 0), 1));
  };
  return (
    <StyledInput
      type="number"
      classes={{
        input: classes.numericInput,
      }}
      fullWidth
      value={getInputValue(value)}
      inputProps={{
        step: 0.1,
        min: 0,
        max: 100,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  );
};

Editor.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  value: undefined,
};

const availableFilterOperations = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

export const PercentTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    availableFilterOperations={availableFilterOperations}
    {...props}
  />
);
