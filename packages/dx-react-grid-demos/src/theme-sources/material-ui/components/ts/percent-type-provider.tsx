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

const getInputValue = (value) : string => (value === undefined ? '' : (value * 100).toFixed(1));

const Editor = withStyles(styles)(
  ({ value, onValueChange, classes }: EditorProps) => {
    const handleChange = (event) => {
      const targetValue : number = Number(event.target.value) / 100;
      onValueChange(Math.min(Math.max(targetValue, 0), 1));
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
          max: 100,
          min: 0,
          placeholder: 'Filter...',
          step: 0.1,
        }}
        onChange={handleChange}
      />
    );
  }
);

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
