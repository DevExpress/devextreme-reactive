# DevExtreme React DataGrid

Component suite to build your own DataGrid.

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Reference](#reference)

## Installation

Install package:

```
npm i @devexpress/dx-react-datagrid --save
```

Add to your project:

```js
import { DataGrid } from '@devexpress/dx-react-datagrid'
```

## Getting Started

### Minimal Setup

By default DataGrid renders nothing. This is because functionality is contained in plugins. So we should specify at least one plugin that visualize supplied data. Also, this package does not contain any visual components required for specific plugins. Due to this thing, we are recommend you to use one of the predefined template packages:
- [DevExtreme React DataGrid Bootstrap3](../dx-react-datagrid-bootstrap3/README.md) (used in examples below)

```js
import {
  DataGrid
} from '@devexpress/dx-react-datagrid';
import {
  TableView
} from '@devexpress/dx-react-datagrid-bootstrap3';

export const DataGridBootstrap3Theme = ({ children }) => (
  <DataGrid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </DataGrid>
);
```

NOTE: You can write your own templates based on plugins specification.

### Plugins

The are following plugin types:
- State Management. These plugins handle state and change it in respond to actions defined by them.
- Data Processing. These plugins modifies data passed into widget.
- UI Representation. These plugins visualize data and states. Also they can emit actions provides by state management plugins.

Follow the link to see full plugin list: [Reference](#reference)

### Plugin Order

All DataGrid plugins consists of core plugins.

Each core plugin component has some unique behavior. See details: [DevExtreme React Core](../dx-react-core/README.md)

This is the reason why we should specify plugins in correct order. So, if data processing is based on some state, it should be inserted after appropriate state plugin. See the following example:

```js
import {
  DataGrid, FilteringState, LocalFiltering
} from '@devexpress/dx-react-datagrid'
import {
  TableView
} from '@devexpress/dx-react-datagrid-bootstrap3';

export const CustomDataGrid = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView/>
  </DataGrid>
);
```

As you may notice, that in previous example, the TableView plugin specified after data processing one. The same rule is applied for visualization plugins. See the following example:

```js
import {
  DataGrid, FilteringState, LocalFiltering
} from '@devexpress/dx-react-datagrid'
import {
  TableView, TableFilterRow
} from '@devexpress/dx-react-datagrid-bootstrap3';

export const CustomDataGrid = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView/>
    <TableFilterRow filterCellTemplate={...}/>
  </DataGrid>
);
```

NOTE: Refer to the plugin documentation if you have questions about requirements for specific plugin.

## Reference

State Managment Plugins:
- [FilteringState](#filteringstate-reference)
- [SortingState](#sortingstate-reference)
- GroupingState
- SelectionState
- PagingState

Data Processing Plugins:
- [LocalFiltering](#localfiltering-reference)
- [LocalSorting](#localsorting-reference)
- LocalPaging
- LocalGrouping

Visualization Plugins:
- [TableView](#tableview-reference)
- TableHeaderRow
- TableHeaderRowSorting (REMOVE?)
- TableHeaderRowGrouping (REMOVE?)
- TableFilterRow
- TableColumnSelection
- TableGroupRow
- TableColumnSelection
- PagingPanel
- GroupingPanel

### FilteringState Reference

Plugin that manages filtering state.

Filter data structure:

Field  | Type   | Description
-------|--------|------------------------------------------------
column | string | Specifies column name to apply filter
value  | string | Specifies value with that rows will be filtered

Dependencies: none

Properties:

Property      | Type                                   | Default Value | Description
--------------|----------------------------------------|---------------|-----------------------------------------------------
filters       | array&lt;Filter&gt;                    | undefined     | Specifies filters applied
defaultFilter | array&lt;Filter&gt;                    | undefined     | Specifies starting filters for uncontrolled scenario
filtersChange | (filters: array&lt;Filter&gt;) => void | undefined     | Handles filters change

Import: none

Exports:

Name            | Type   | Description
----------------|--------|-------------------------
filters         | Getter | Applied column filters
setColumnFilter | Action | Change filter for column

### SortingState Reference

Plugin that manages sortings state.

Sorting data structure:

Field     | Type              | Description
----------|-------------------|----------------------------------------------
column    | string            | Specifies column name to apply sorting
direction | 'asc'&#124;'desc' | Specifies value with that rows will be sorted

Dependencies: none

Properties:

Property        | Type                                     | Default Value | Description
----------------|------------------------------------------|---------------|------------------------------------------------------
sortings        | array&lt;Sorting&gt;                     | undefined     | Specifies sortings applied
defaultSortings | array&lt;Sorting&gt;                     | undefined     | Specifies starting sortings for uncontrolled scenario
sortingsChange  | (sortings: array&lt;Sorting&gt;) => void | undefined     | Handles sortings change

Import: none

Exports:

Name             | Type   | Description
-----------------|--------|--------------------------
sortings         | Getter | Applied column sortings
setColumnSorting | Action | Change sorting for column

### LocalFiltering Reference

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

### LocalSorting Reference

Plugin that performs local data sorting.

Dependencies:
- SortingState

Properties: none

Imports:

Name     | Type   | Description
---------|--------|------------------------------
rows     | Getter | Rows to be sorted
sortings | Getter | Column sortings to be applied

Exports:

Name | Type   | Description
-----|--------|--------------------------------
rows | Getter | Rows with applied local sorting

### TableView Reference

Plugin that implements basic table layout rendering.

Dependencies: none

Properties:

Property      | Type                        | Description
--------------|-----------------------------|----------------------------------------------------------
tableTemplate | Component&lt;TableProps&gt; | Component that renders table based on supplied parameters
