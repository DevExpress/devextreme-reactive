import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

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
    <input
      type="number"
      className="form-control text-right"
      style={{ width: '100%' }}
      value={getInputValue(value)}
      min={0}
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

const Formatter = ({ value }) => `$${value}`;

export const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    {...props}
  />
);
