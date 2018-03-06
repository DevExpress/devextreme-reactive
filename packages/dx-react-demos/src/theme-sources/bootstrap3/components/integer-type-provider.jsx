import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const IntegerEditor = ({ value, onValueChange }) => (
  <input
    type="number"
    className="form-control text-right"
    style={{ width: '100%' }}
    value={value}
    step={100}
    min={0}
    onChange={e => onValueChange(parseInt(e.target.value, 10))}
  />
);

IntegerEditor.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export const IntegerTypeProvider = props => (
  <DataTypeProvider
    editorComponent={IntegerEditor}
    {...props}
  />
);
