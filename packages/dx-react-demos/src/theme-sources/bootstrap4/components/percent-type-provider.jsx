import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const Editor = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const targetValue = parseFloat(event.target.value / 100);
    onValueChange(Math.min(Math.max(targetValue, 0), 1));
  };
  return (
    <input
      type="number"
      className="form-control text-right"
      style={{ width: '100%' }}
      value={(value * 100).toFixed(1)}
      step={0.1}
      min={0}
      max={100}
      onChange={handleChange}
    />
  );
};

Editor.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export const PercentTypeProvider = props => (
  <DataTypeProvider
    editorComponent={Editor}
    {...props}
  />
);
