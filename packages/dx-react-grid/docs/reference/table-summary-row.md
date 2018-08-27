# TableSummaryRow Plugin Reference

A plugin that renders table rows that display a total, group, and tree summary.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableSummaryRow } from '@devexpress/dx-react-grid-material-ui';
// import { TableSummaryRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableSummaryRow } from '@devexpress/dx-react-grid-bootstrap3';
```

You can import the themeless plugin to use custom components:

```js
import { TableSummaryRow } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [DataTypeProvider](data-type-provider.md) [Optional]
- [SummaryState](summary-state.md)
- [CustomSummary](custom-summary.md) [Optional]
- [IntegratedSummary](integrated-summary.md) [Optional]
- [Table](table.md)
- [TableTreeColumn](table-tree-column.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
formatlessSummaryTypes | Array&lt;string&gt; | | An array of summary types that the `DataTypeProvider` plugin should not format.
totalRowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders the total summary row.
groupRowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a group summary row.
treeRowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a tree summary row.
totalCellComponent | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | | A component that renders a total summary cell.
groupCellComponent | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | | A component that renders a group summary cell.
treeCellComponent | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | | A component that renders a tree summary cell.
treeColumnCellComponent | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | | A component that renders a summary cell within a tree column.
treeColumnContentComponent | ComponentType&lt;[TableSummaryRow.ContentProps](#tablesummaryrowcontentprops)&gt; | | A component that renders a summary cell's content within a tree column.
treeColumnIndentComponent | ComponentType&lt;[TableSummaryRow.IndentProps](#tablesummaryrowindentprops)&gt; | | A component that renders an indent used to identify a tree row level within a tree column.
itemComponent | ComponentType&lt;object&gt; | | A component that renders a summary item.
messages? | [TableSummaryRow.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### TableSummaryRow.CellProps

Describes properties passed to a component that renders a cell in a summary row.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | Specifies the cell's column.
children? | ReactNode | A React node to be rendered within the cell.

### TableSummaryRow.ContentProps

Describes properties passed to a component that renders a cell's content.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be rendered within the cell's content.

### TableSummaryRow.IndentProps

Describes properties passed to a component that renders an indent used to identify a row's level.

Field | Type | Description
------|------|------------
level | number | Specifies the row's level.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
count? | string | 'Count' | Specifies the count type's text.
sum? | string | 'Sum' | Specifies the summary type's text.
min? | string | 'Min' | Specifies the minimum type's text.
max? | string | 'Max' | Specifies the maximum type's text.
avg? | string | 'Avg' | Specifies the average type text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableSummaryRow.Cell | [TableSummaryRow.CellProps](#tablesummaryrowcellprops) | A component that renders a cell within a data row.
totalRowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | A component that renders the total summary row.
TableSummaryRow.GroupRow | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | A component that renders a group summary row.
TableSummaryRow.TreeRow | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | A component that renders a tree summary row.
TableSummaryRow.TotalCell | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | A component that renders a total summary cell.
TableSummaryRow.GroupCell | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | A component that renders a group summary cell.
TableSummaryRow.TreeCell | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | A component that renders a tree summary cell.
TableSummaryRow.TreeColumnCell | ComponentType&lt;[TableSummaryRow.CellProps](#tablesummaryrowcellprops)&gt; | A component that renders a summary cell within a tree column.
TableSummaryRow.TreeColumnContent | ComponentType&lt;[TableSummaryRow.ContentProps](#tablesummaryrowcontentprops)&gt; | A component that renders a summary cell's content within a tree column.
TableSummaryRow.TreeColumnIndent | ComponentType&lt;[TableSummaryRow.IndentProps](#tablesummaryrowindentprops)&gt; | A component that renders an indent used to identify a tree row's level in a tree column.
TableSummaryRow.Item | ComponentType&lt;object&gt; | A component that renders a summary item.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
tableFooterRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table footer rows.
tableTreeColumnName | [Getter](../../../dx-react-core/docs/reference/getter.md) | string | The name of a column that is displayed as a tree.
getTreeRowLevel | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number | A function used to identify a node level in tree data structure.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
totalSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](summary-state.md#summaryitem)&gt; | Total summary items.
groupSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](summary-state.md#summaryitem)&gt; | Group summary items.
treeSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](summary-state.md#summaryitem)&gt; | Summary items applied to rows that contain child rows.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows with group and tree summaries.
tableFooterRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table footer rows with the total summary.
