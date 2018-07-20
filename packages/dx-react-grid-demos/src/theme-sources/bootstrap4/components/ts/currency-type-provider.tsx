import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import * as React from 'react';

const getInputValue = (value?: string) =>
  (value === undefined ? '' : value);

const Editor = ({ onValueChange, value }: DataTypeProvider.ValueEditorProps) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() !== '') {
        onValueChange(parseInt(targetValue, 10));
      }
    };
    return (
      <input
        type="number"
        className="form-control text-right"
        placeholder="Filter..."
        value={getInputValue(value)}
        min={0}
        onChange={handleChange}
      />
    );
  }

const Formatter = ({ value }: DataTypeProvider.ValueFormatterProps) => <span>${value}</span>;

const availableFilterOperations = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

export const CurrencyTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider
    formatterComponent={Formatter}
    editorComponent={Editor}
    availableFilterOperations={availableFilterOperations}
    {...props}
  />
);
