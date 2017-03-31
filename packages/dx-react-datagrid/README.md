# DevExtreme React DataGrid

Component suite to build your own DataGrid.

## Installation

Install package:

```
npm i @devexpress/dx-react-datagrid --save
```

Add to your project:

```js
import { DataGrid, ... } from '@devexpress/dx-react-datagrid'

export const CustomDataGrid = () => (
  <DataGrid>
    {/* Plugins */}
  </DataGrid>
);
```

## Getting Started

### Minimal Setup

By default DataGrid renders nothing. So, the minimal widget setup is not enough:

```js
import { DataGrid } from '@devexpress/dx-react-datagrid'

export const CustomDataGrid = () => (
  <DataGrid rows={[...]} columns={[...]}></DataGrid>
);
```

This is because functionality is contained in plugins. So we should specify at least one plugin that visualize supplied data:

```js
import { DataGrid, TableView } from '@devexpress/dx-react-datagrid'

export const CustomDataGrid = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <TableView tableTemplate={...}/>
  </DataGrid>
);
```

Please note, that all plugins in this package does not contain visual components. For your convenience it is better to use one of the predefined templates:
- [DevExtreme React DataGrid Bootstrap3](../dx-react-datagrid-bootstrap3/README.md)

Or feel free to write your own templates.

### Plugins

The are following plugin types:
- State Managment. These plugins handle state and change it in respond to actions defined by them. [FilteringState, SortingState, GroupingState, SelectionState]
- Data Processing. These plugins modyfies data passed into widget. [LocalFiltering, LocalSorting, LocalGrouping]
- UI Representation. These plugins vizualize data and states. Also they can emit actions provides by state managment plugins. [TableView, TableHeaderRow, TableHeaderRowSorting, TableHeaderRowGrouping, TableFilterRow, TableColumnSelection, TableGroupRow, TableColumnSelection, PagingPanel, GroupingPanel]


### Plugin Order

All DataGrid plugins consists of core plugins.

Each core plugin component has some unique behavior. <TODO: link to basic plugins descriptions (getter, template, template-placeholder, action)>

This is the reason why we should specify plugins in correct order. So, if data processing is based on some state, it should be inserted after appropriate state plugin. See the following example:

```js
import { DataGrid, TableView, FilteringState, LocalFiltering } from '@devexpress/dx-react-datagrid'

export const CustomDataGrid = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView tableTemplate={...}/>
  </DataGrid>
);
```

The same rule is applied for visualization plugins. See the following example:

```js
import { DataGrid, TableView, TableFilterRow, FilteringState, LocalFiltering } from '@devexpress/dx-react-datagrid'

export const CustomDataGrid = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView tableTemplate={...}/>
    <TableFilterRow filterCellTemplate={...}/>
  </DataGrid>
);
```

NOTE: Refer to the plugin documentation if you have questions about requirements for specific plugin.

## Documentation

### FilteringState

Plugin that manages filtering state.

Dependencies: none

Properties:

Property        | Type                            | Default Value | Description
----------------|---------------------------------|---------------|-----------------------------------------------------
`filters`       | `array<int>`                    | `undefined`   | Specifies filters applied
`filtersChange` | `(filters: array<int>) => void` | `undefined`   | Handles filters change
`defaultFilter` | `array<int>`                    | `undefined`   | Specifies starting filters for uncontrolled scenario

Import: none

Exports:

Name            | Type   | Description
----------------|--------|-------------------------
filters         | Getter | Applied column filters
setColumnFilter | Action | Change filter for column

### LocalFiltering

Plugin that performs local data filtering.

Dependencies:
- FilteringState

Properties: none

Imports:

Name    | Type   | Description
--------|--------|-----------------------------
rows    | Getter | Rows to be filtered
filters | Getter | Column filters to be applied

Exports:

Name | Type   | Description
-----|--------|----------------------------------
rows | Getter | Rows with applied local filtering
