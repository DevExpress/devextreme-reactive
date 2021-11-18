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

const getInputValue = value => (value === undefined ? '' : value);

const Editor = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
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
        min: 0,
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

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const Formatter = ({ value }) => currencyFormatter.format(value);

const availableFilterOperations = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

export const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    availableFilterOperations={availableFilterOperations}
    {...props}
  />
);
