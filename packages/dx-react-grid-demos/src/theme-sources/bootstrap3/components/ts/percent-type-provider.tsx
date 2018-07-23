import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import * as React from 'react';

const getInputValue = (value) : string => (value === undefined ? '' : (value * 100).toFixed(1));

const Editor : React.ComponentType<DataTypeProvider.ValueEditorProps> =
  ({ value, onValueChange } : DataTypeProvider.ValueEditorProps) => {
    const handleChange = (event) => {
      const targetValue : number = Number(event.target.value) / 100;
      onValueChange(Math.min(Math.max(targetValue, 0), 1));
    };
    return (
      <input
        type="number"
        className="form-control text-right"
        placeholder="Filter..."
        value={getInputValue(value)}
        step={0.1}
        min={0}
        max={100}
        onChange={handleChange}
      />
    );
};

const availableFilterOperations : string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

export const PercentTypeProvider : React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      editorComponent={Editor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);
