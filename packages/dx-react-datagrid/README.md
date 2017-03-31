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
- State Managment. These plugins handle state and change it in respond to actions defined by them.
- Data Processing. These plugins modyfies data passed into widget.
- UI Representation. These plugins vizualize data and states. Also they can emit actions provides by state managment plugins.

Follow the link to see full plugin list: [Reference](#reference)

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

As you may notice, that in previous example, the TableView plugin specified after data processing one. The same rule is applied for visualization plugins. See the following example:

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

## Reference

State Managment Plugins:
- [FilteringState](#filteringstate-reference)
- [SortingState](#sortingstate-reference)
- GroupingState
- SelectionState

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
