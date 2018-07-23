import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import * as React from 'react';

const getInputValue = (value?: string) : string =>
  (value === undefined ? '' : value);

const Editor = ({ onValueChange, value } : DataTypeProvider.ValueEditorProps) => {
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

const Formatter : React.ComponentType<DataTypeProvider.ValueFormatterProps> =
  ({ value }: DataTypeProvider.ValueFormatterProps) => <span>${value}</span>;

const availableFilterOperations : string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

export const CurrencyTypeProvider : React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={Formatter}
      editorComponent={Editor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);
