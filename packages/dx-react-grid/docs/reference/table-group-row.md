# TableGroupRow Plugin Reference

A plugin that renders group rows and enables them to expand and collapse.

## Import

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
- [TableSelection](table-selection.md) [Optional]
- [IntegratedSummary](integrated-summary.md) [Optional]
- [CustomSummary](custom-summary.md) [Optional]
- [SummaryState](summary-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showColumnsWhenGrouped? | boolean | false | A Boolean value that specifies whether the grid's table displays a column by which data is grouped.
columnExtensions? | Array&lt;[TableGroupRow.ColumnExtension](#tablegrouprowcolumnextension)&gt; | | Additional column properties that the plugin can handle.
cellComponent | ComponentType&lt;[TableGroupRow.CellProps](#tablegrouprowcellprops)&gt; | | A component that renders a group cell.
rowComponent | ComponentType&lt;[TableGroupRow.RowProps](#tablegrouprowrowprops)&gt; | | A component that renders a group row.
contentComponent | ComponentType&lt;[TableGroupRow.ContentProps](#tablegrouprowcontentprops)&gt; | | A component that renders a group cell content.
iconComponent | ComponentType&lt;[TableGroupRow.IconProps](#tablegrouprowiconprops)&gt; | | A component that renders a group expand icon.
indentCellComponent? | ComponentType&lt;[TableGroupRow.IndentCellProps](#tablegrouprowindentcellprops)&gt; | null | A component that renders a group indent cell.
inlineSummaryComponent | ComponentType&lt;[TableGroupRow.InlineSummaryProps](#tablegrouprowinlinesummaryprops)&gt; | | A component that renders a container for group summary items in a group caption.
inlineSummaryItemComponent | ComponentType&lt;[TableGroupRow.InlineSummaryItemProps](#tablegrouprowinlinesummaryitemprops)&gt; | | A component that renders a single group summary item in a group caption.
summaryCellComponent | ComponentType&lt;[TableGroupRow.SummaryCellProps](#tablegrouprowsummarycellprops)&gt; | | A component that renders a cell for a group summary item in an appropriate column.
summaryItemComponent | ComponentType&lt;[TableSummaryRow.ItemProps](table-summary-row.md#tablesummaryrowitemprops)&gt; | | A component that renders a group summary item in its column.
stubCellComponent | ComponentType&lt;[TableGroupRow.StubCellProps](#tablegrouprowstubcellprops)&gt; | | A component that renders a stub cell used to align summary items in their columns.
formatlessSummaryTypes | Array&lt;string&gt; | | Summary types that the `DataTypeProvider` plugin should not format.
messages? | [TableGroupRow.LocalizationMessages](#localization-messages) | | Localization messages.
indentColumnWidth | number | `33` for [Bootstrap4](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap4) and for [Bootstrap](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3); `48` for [Material-UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) | The group indent column's width.
contentCellPadding | string | `0.75rem` for [Bootstrap4](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap4); `8px` for [Bootstrap](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and for [Material-UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) | The group cell's left padding value.

## Interfaces

### TableGroupRow.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
showWhenGrouped? | boolean | Specifies whether the grid displays the column by which data is grouped.

### TableGroupRow.InlineSummaryItemInfo

Describes a summary item to be displayed in a group caption.

Field | Type | Description
------|------|------------
columnTitle | string | The title of the column for which the summary item is calculated.
type | [SummaryType](#summarytype) | The summary type.
value | number | The summary value.
messageKey | string | A [key](#localization-messages) used to get a localized message.
component | ReactNode | A React node used to render the summary value.

### TableGroupRow.CellProps

Describes properties passed to a component that renders a group cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | The column associated with the group.
expanded | boolean | Specifies whether the row is expanded.
onToggle | () => void | An event that initiates group row expanding or collapsing.
inlineSummaries | Array&lt;[GroupInlineSummary](#groupinlinesummary)&gt; | Summary items in this container.
inlineSummaryComponent |ComponentType&lt;[TableGroupRow.InlineSummaryProps](#tablegrouprowinlinesummaryprops)&gt; | A component that renders a container for group summary items in a group caption.
inlineSummaryItemComponent | ComponentType&lt;[TableGroupRow.InlineSummaryItemProps](#tablegrouprowinlinesummaryitemprops)&gt; | A component that renders an inline group summary item.
getMessage | ([messageKey](#localization-messages): string) => string | A function that uses the message ID to get a localized message.

### TableGroupRow.RowProps

Describes properties passed to a component that renders a group row.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.

### TableGroupRow.ContentProps

Describes properties passed to a component that renders a group cell content.

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | The column associated with the group.
children? | ReactNode | A React node to be rendered within the cell content.

### TableGroupRow.IconProps

Describes properties passed to a component that renders a group expand icon.

Field | Type | Description
------|------|------------
expanded | boolean | Specifies whether the row is expanded.

### TableGroupRow.IndentCellProps

Describes properties passed to a component that renders a group indent cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | A column associated with the group.

### TableGroupRow.InlineSummaryProps

Describes properties passed to a component that renders a container for summary items to be displayed in a group caption.

Field | Type | Description
------|------|------------
inlineSummaries | Array&lt;[GroupInlineSummary](#groupinlinesummary)&gt; | Summary items in this container.
inlineSummaryItemComponent | ComponentType&lt;[TableGroupRow.InlineSummaryItemProps](#tablegrouprowinlinesummaryitemprops)&gt; | A component that renders an inline group summary item.
getMessage | ([messageKey](#localization-messages): string) => string | A function that uses the message ID to get a localized message.

### TableGroupRow.InlineSummaryItemProps

Describes properties passed to a component that renders a summary item in a group caption.

Field | Type | Description
------|------|------------
summary | [SummaryItem](summary-state.md#summaryitem) | The summary item.
getMessage | ([messageKey](#localization-messages): string) => string | A function that gets a localized message by message ID.

### TableGroupRow.SummaryCellProps

Describes properties passed to a component that renders a cell for a summary item in an appropriate column.

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | The column for which the summary is calculated.
onToggle | () => void | A function that is executed when the group row is expanded or collapsed.
children | ReactNode | A React node to be rendered within the cell.

### TableGroupRow.StubCellProps

Describes properties passed to a component that renders a stub cell used to align summary items in their columns.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
onToggle | () => void |  A function that is executed when a group row is expanded or collapsed.

### GroupRow

Describes the group row structure.

Field | Type | Description
------|------|------------
key | number &#124; string | The current group key.
value | any | The current group value.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
count? | string | 'Count' | Specifies a text for a `count` summary item when it is displayed in a column.
sum? | string | 'Sum' | Specifies a text for a `sum` summary item when it is displayed in a column.
min? | string | 'Min' | Specifies a text for a `min` summary item when it is displayed in a column.
max? | string | 'Max' | Specifies a text for a `max` summary item when it is displayed in a column.
avg? | string | 'Avg' | Specifies a text for a `avg` summary item when it is displayed in a column.
countOf? | string | 'Count: ' | Specifies a text for a `count` summary item when it is displayed in a group caption.
sumOf? | string | 'Sum of {columnTitle} is' | Specifies a text for a `sum` summary item when it is displayed in a group caption.
minOf? | string | 'Min of {columnTitle} is' | Specifies a text for a `min` summary item when it is displayed in a group caption.
maxOf? | string | 'Max of {columnTitle} is' | Specifies a text for a `max` summary item when it is displayed in a group caption.
avgOf? | string | 'Avg of {columnTitle} is' | Specifies a text for a `avg` summary item when it is displayed in a group caption.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableGroupRow.Row | [TableGroupRow.RowProps](#tablegrouprowrowprops) | A component that renders a group row.
TableGroupRow.Cell | [TableGroupRow.CellProps](#tablegrouprowcellprops) | A component that renders a group cell.
TableGroupRow.Content | [TableGroupRow.ContentProps](#tablegrouprowcontentprops) | A component that renders a group cell content.
TableGroupRow.Icon | [TableGroupRow.IconProps](#tablegrouprowiconprops) | A component that renders a group expand icon.
TableGroupRow.InlineSummary | [TableGroupRow.InlineSummaryProps](#tablegrouprowinlinesummaryprops) | A component that renders a container for group summary items in a group caption.
TableGroupRow.InlineSummaryItem | [TableGroupRow.InlineSummaryItemProps](#tablegrouprowinlinesummaryitemprops) | A component that renders a single group summary item in a group caption.
TableGroupRow.SummaryCell | [TableGroupRow.SummaryCellProps](#tablegrouprowsummarycellprops) | A component that renders a cell for a group summary item in an appropriate column.
TableGroupRow.SummaryItem | [TableSummaryRow.ItemProps](table-summary-row.md#tablesummaryrowitemprops) | A component that renders a group summary item in its column.


Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
COLUMN&lowbar;TYPE | symbol | The group column type's identifier.
ROW&lowbar;TYPE | symbol | The group row type's identifier.

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
