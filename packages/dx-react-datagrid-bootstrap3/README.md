# DevExtreme React DataGrid Bootstrap3

Template suite to customize React DataGrid with Bootstrap3 rendering.

## Installation

Install package and its dependencies:

```
npm i @devexpress/dx-react-datagrid --save
npm i @devexpress/dx-react-datagrid-bootstrap3 --save
```

Add into your project:

```js
import {
    DataGrid
} from '@devexpress/dx-react-datagrid';
import {
    TableView
} from '@devexpress/dx-react-datagrid-bootstrap3';

export const DataGridBootstrap3Theme = ({ children }) => (
  <DataGrid>
    <TableView />
  </DataGrid>
);
```
