import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import Input from '@material-ui/core/Input';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = createStyles({
  numericInput: {
    textAlign: 'right',
    width: '100%',
  },
});

type EditorProps = DataTypeProvider.ValueEditorProps & WithStyles<typeof styles>;

const getInputValue = (value?: string) : string =>
  (value === undefined ? '' : value);

const Editor = withStyles(styles)(
  ({ onValueChange, classes, value } : EditorProps) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange(undefined);
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <Input
        type="number"
        classes={{
          input: classes.numericInput,
        }}
        fullWidth={true}
        value={getInputValue(value)}
        inputProps={{
          min: 0,
          placeholder: 'Filter...',
        }}
        onChange={handleChange}
      />
    );
  }
);

const Formatter : React.ComponentType<DataTypeProvider.ValueFormatterProps> =
  ({ value } : DataTypeProvider.ValueFormatterProps) => <span>${value}</span>;

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
