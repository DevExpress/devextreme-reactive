import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const getInputValue = value => (value === undefined ? '' : (value * 100).toFixed(1));

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
    <input
      type="number"
      className="form-control text-right"
      style={{ width: '100%' }}
      value={getInputValue(value)}
      step={0.1}
      min={0}
      max={100}
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

export const PercentTypeProvider = props => (
  <DataTypeProvider
    editorComponent={Editor}
    {...props}
  />
);
