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

const getInputValue = (value?: string) =>
  (value === undefined ? '' : value);

const Editor = withStyles(styles)(
  ({ onValueChange, classes, value }: EditorProps) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() !== '') {
        onValueChange(parseInt(targetValue, 10));
      }
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
