import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const FloatEditor = ({ value, onValueChange }) => (
  <input
    type="number"
    className="form-control text-right"
    style={{ width: '100%' }}
    value={(value * 100).toFixed(1)}
    step={0.1}
    min={0}
    max={100}
    onChange={e => onValueChange(parseFloat(e.target.value / 100))}
  />
);

FloatEditor.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export const FloatTypeProvider = props => (
  <DataTypeProvider
    editorComponent={FloatEditor}
    {...props}
  />
);
