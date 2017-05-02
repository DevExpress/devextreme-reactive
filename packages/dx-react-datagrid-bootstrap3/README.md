# DevExtreme React DataGrid Bootstrap3

A template suite used to customize the React DataGrid with Bootstrap3 rendering.

## Installation

Install package and its dependencies:

```
npm i @devexpress/dx-react-datagrid --save
npm i @devexpress/dx-react-datagrid-bootstrap3 --save
```

Add the required modules to your project:

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

Make sure that Bootstrap styles are linked to a page. If you have not yet configured Bootstrap for your project, check the following link: http://getbootstrap.com/getting-started/#download.

## Getting started

This repository contains standalone templates and templates integrated into plugins. For your convenience, these templates can be used instead of the ones contained in the original React DataGrid repository.

See [demos](../dx-react-demos/README.md) for more information.

## Reference

The package exposes plugins with integrated templates. Here the list of plugins:

- [TableView](../dx-react-datagrid/docs/reference/table-view.md)
- [TableHeaderRow](../dx-react-datagrid/docs/reference/table-header-row.md)
- [TableSelection](../dx-react-datagrid/docs/reference/table-selection.md)
- [TableFilterRow](../dx-react-datagrid/docs/reference/table-filter-row.md)
- [TableRowDetail](../dx-react-datagrid/docs/reference/table-row-detail.md)
- [TableGroupRow](../dx-react-datagrid/docs/reference/table-group-row.md)
- [GroupingPanel](../dx-react-datagrid/docs/reference/grouping-panel.md)
- [PagingPanel](../dx-react-datagrid/docs/reference/paging-panel.md)

Each plugin has properties with 'Template' postfix. Components passed to such properties are templates.

Templates can be overridden by passing your own component or rendering function. If you want to render a UI item with a built-in template, you can return `undefined` from you custom template.
