# Basic Usage

## Overview

The main purpose of React Grid is showing data passed into it. To specify data that Grid should display you can use the `rows` property.

The next basic property of Data Grid is `columns`. It defines what row fields should be used by Grid.

```js
<Grid
  rows={[
    { region: 'South America', sector: 'Banking' },
    { region: 'Africa', sector: 'Manufacturing' },
    /* ... */
  ]}
  columns={[
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    /* ... */
  ]}
>
</Grid>
```

Actually, the described properties give React Grid information about data.

As for UI, there are two common plugins that allow representing records.

The first one is the [TableView](../reference/table-view.md). It renders data as a simple table:


```js
<Grid
  rows={rows}
  columns={columns}
>
  <TableView />
</Grid>
```

The second is the [TableHeaderRow](../reference/table-header-row.md) plugin. Pay attention, it should be placed [after](plugin-overview.md#plugin-order) the `TableView`.

```js
<Grid
  rows={rows}
  columns={columns}
>
  <TableView />
  <TableHeaderRow />
</Grid>
```

The following demo shows the basic scenario of React Grid usage.

.embedded-demo(basic/basic)

## Basic Appearance Customization

The `TableView` and `TableHeaderRow` plugins provide the rich API for appearance customization.

Often, it's necessary to use more complex markup instead of plain text within a table cell. For example, in case if you are interested in implementing conditional formatting functionality.

The `tableCellTemplate` property of the `TableView` plugin allows to achieve it.

In the demo below we use a custom text color depend on some condition. Otherwise, we return `undefined` to use a default table cell template.

.embedded-demo(basic/table-cell-template)

The second popular scenario is handling row events like `onClick`, `onContextMenu` etc. The `tableRowTemplate` helps to implement such functionality.

.embedded-demo(basic/table-row-template)

Pay attention, you can use the `children` argument field to avoid manual cells rendering.

Other plugins like [TableHeaderRow](../reference/table-header-row.md), [TableEditRow](../reference/table-edit-row.md), [TableFilterRow](../reference/table-filter-row.md), [TableGroupRow](../reference/table-group-row.md) and [TableRowDetail](../reference/table-row-detail.md) contain the similar API for templates customization.
