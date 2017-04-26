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

export const App = () => (
  <DataGrid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </DataGrid>
);
```

Make sure that Bootstrap styles are linked to a page. If you have not yet configured a Bootstrap for your project, check the following link: http://getbootstrap.com/getting-started/#download.

## Getting started

This repository contains templates and plugin wrappers with injected templates. These wrappers can be used instead of the ones from the original React DataGrid repository for your convenience.

See [demos](../dx-react-demos/README.md) for more information.

## Reference

Plugin wrappers:
- TableView
- TableHeaderRow
- TableFilterRow
- TableSelection
- TableGroupRow
- TableSelection
- PagingPanel
- GroupingPanel
