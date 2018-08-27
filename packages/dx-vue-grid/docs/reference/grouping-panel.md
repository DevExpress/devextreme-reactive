# DxGroupingPanel Plugin Reference

A plugin that renders the Grouping Panel in the Grid's header. This panel displays grouped columns and allows a user to modify grouping options.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and render sorting indicators.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxGroupingPanel } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxGroupingPanel } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxSortingState](sorting-state.md) [Optional]
- [DxGroupingState](grouping-state.md)
- [DxToolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showSortingControls? | boolean | false | Specifies whether to render controls that toggle the column's sorting state. Requires the [DxSortingState](sorting-state.md) dependency.
showGroupingControls? | boolean | false | Specifies whether column headers display a button that cancels grouping by that column.
containerComponent | [DxGroupingPanel.DxContainer](#dxgroupingpaneldxcontainer) | | A component that renders a group panel container.
itemComponent | [DxGroupingPanel.DxItem](#dxgroupingpaneldxitem) | | A component that renders a group panel item.
emptyMessageComponent | [DxGroupingPanel.DxEmptyMessage](#dxgroupingpaneldxemptymessage) | | A component that renders an empty group panel message.
messages? | [DxGroupingPanel.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### GroupingPanelItem

Describes the grouping panel item properties.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column associated with the item.

## Component Types

### DxGroupingPanel.DxContainer

#### Slots

Field | Description
------|------------
default | The default Vue slot

### DxGroupingPanel.DxItem

#### Props

Field | Type | Description
------|------|------------
item | [GroupingPanelItem](#groupingpanelitem) | The Grouping Panel item.
showGroupingControls | boolean | Specifies whether to display a button that cancels grouping by column.
showSortingControls | boolean | Specifies whether to render controls that toggle the column's sorting state.
groupingEnabled | boolean | Specifies whether grouping by a column is enabled.
sortingEnabled | boolean | Specifies whether sorting by a column is enabled.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the sorting direction.

#### Events

Field | Type | Description
------|------|------------
group | () => void | An event that initiates grouping by column.
sort | (parameters: { direction?: 'asc' &#124; 'desc' &#124; null }) => void | An event that initiates changing the column sorting direction. Cancels sorting by the current column if `direction` is set to null.

### DxGroupingPanel.DxEmptyMessage

#### Props

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in the group panel if grid data is not grouped.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
groupByColumn? | string | '' | The text displayed in the group panel if the grid is not grouped.

## Plugin Components

Name | Type | Description
-----|------|------------
DxGroupingPanel.components.DxContainer | [DxGroupingPanel.DxContainer](#dxgroupingpaneldxcontainer) | A component that renders a group panel container.
DxGroupingPanel.components.DxItem | [DxGroupingPanel.DxItem](#dxgroupingpaneldxitem) | A component that renders a group panel item.
DxGroupingPanel.components.DxEmptyMessage | [DxGroupingPanel.DxEmptyMessage](#dxgroupingpaneldxemptymessage) | A component that renders an empty group panel message.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
changeColumnGrouping | Action | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the last position.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
changeColumnSorting | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column.
isColumnSortingEnabled | Getter | (columnName: string) => boolean | A function that returns a Boolean value that defines if sorting by a column is enabled.
isColumnGroupingEnabled | Getter | (columnName: string) => boolean | A function that returns a Boolean value that defines if grouping by a column is enabled.
draggingEnabled | Getter | boolean | Specifies whether drag-and-drop is enabled.
toolbarContent | Template | object? | A template that renders the toolbar content.

### Exports

none
