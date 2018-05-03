# TableGroupRow Plugin Reference

A plugin that renders group rows and enables them to expand and collapse.

## Importing

Use the following statement to import a plugin with embedded theme components:

```js
import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui';
// import { TableGroupRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableGroupRow } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableGroupRow } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showColumnsWhenGrouped? | boolean | false | A Boolean value that specifies whether the grid's table displays a column by which data is grouped.
columnExtensions? | Array&lt;[TableGroupRow.ColumnExtension](#tablegrouprowcolumnextension)&gt; | | Additional column properties that the plugin can handle.
cellComponent | ComponentType&lt;[TableGroupRow.CellProps](#tablegrouprowcellprops)&gt; | | A component that renders a group cell.
rowComponent | ComponentType&lt;[TableGroupRow.RowProps](#tablegrouprowrowprops)&gt; | | A component that renders a group row.
indentCellComponent? | ComponentType&lt;[TableGroupRow.IndentCellProps](#tablegrouprowindentcellprops)&gt; | null | A component that renders a group indent cell.
indentColumnWidth | number | | The group indent column's width.

## Interfaces

### TableGroupRow.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
showWhenGrouped? | boolean | Specifies whether the grid displays the column by which data is grouped.

### TableGroupRow.CellProps

Describes properties passed to a component that renders a group cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | The column associated with the group.
expanded | boolean | Specifies whether the row is expanded.
onToggle | () => void | An event that initiates group row expanding or collapsing.

### TableGroupRow.RowProps

Describes properties passed to a component that renders a group row.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.

### TableGroupRow.IndentCellProps

Describes properties passed to a component that renders a group indent cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](#column-extension) | A column associated with the group.

### GroupRow

Describes the group row structure.

Field | Type | Description
------|------|------------
key | number &#124; string | The current group key.
value | any | The current group value.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableGroupRow.Row | [TableGroupRow.RowProps](#tablegrouprowrowprops) | A component that renders a group row.
TableGroupRow.Cell | [TableGroupRow.CellProps](#tablegrouprowcellprops) | A component that renders a group cell.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](#column-extension)&gt; | The grid columns.
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
grouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Current grouping options.
draftGrouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Grouping options used for the preview.
expandedGroups | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[GroupKey](grouping-state.md#groupkey)&gt; | Expanded groups.
isGroupRow | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a group row within ordinary rows.
toggleGroupExpanded | [Action](../../../dx-react-core/docs/reference/action.md) | ({ groupKey: [GroupKey](grouping-state.md#groupkey) }) => void | Toggles the group's expanded state.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.
valueFormatter | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueFormatterProps](data-type-provider.md#datatypeprovidervalueformatterprops) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the ones by which the table is grouped.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows with modified group rows.
