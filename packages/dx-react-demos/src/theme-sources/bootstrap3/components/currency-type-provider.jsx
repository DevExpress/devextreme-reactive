import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const Editor = ({ value, onValueChange }) => (
  <input
    type="number"
    className="form-control text-right"
    style={{ width: '100%' }}
    value={value}
    min={0}
    onChange={e => onValueChange(parseInt(e.target.value, 10))}
  />
);

Editor.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const Formatter = ({ value }) => `$${value}`;

export const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    {...props}
  />
);
