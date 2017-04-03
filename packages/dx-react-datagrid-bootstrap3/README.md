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

## Getting started

This repository contains templates and plugin wrappers with injected templates. These wrapper can be used instead the same ones from original React DataGrid repository for your convenience.

See [demos](../dx-react-demos/README.md) for more information.

## Reference

Plugin wrappers:
- TableView
- TableHeaderRow
- TableHeaderRowSorting (REMOVE?)
- TableHeaderRowGrouping (REMOVE?)
- TableFilterRow
- TableColumnSelection
- TableGroupRow
- TableColumnSelection
- PagingPanel
- GroupingPanel
