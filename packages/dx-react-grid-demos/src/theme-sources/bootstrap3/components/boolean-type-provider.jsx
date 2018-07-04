import * as React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const Formatter = ({ value }) => (value ? 'Yes' : 'No');

export const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={Formatter}
    {...props}
  />
);
