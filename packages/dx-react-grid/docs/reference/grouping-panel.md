# GroupingPanel Plugin Reference

A plugin that renders the Grouping Panel in the Grid's header. This panel displays grouped columns and allows a user to modify grouping options.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and render sorting indicators.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [DragDropProvider](drag-drop-provider.md) [Optional]
- [GroupingState](grouping-state.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showSortingControls? | boolean | false | Specifies whether to render controls that toggle the column's sorting state. Requires the [SortingState](sorting-state.md) dependency.
showGroupingControls? | boolean | false | Specifies whether column headers display a button that cancels grouping by that column.
containerComponent | ComponentType&lt;[GroupingPanel.ContainerProps](#groupingpanelcontainerprops)&gt; | | A component that renders a group panel container.
itemComponent | ComponentType&lt;[GroupingPanel.ItemProps](#groupingpanelitemprops)&gt; | | A component that renders a group panel item.
emptyMessageComponent | ComponentType&lt;[GroupingPanel.EmptyMessageProps](#groupingpanelemptymessageprops)&gt; | | A component that renders an empty group panel message.
messages? | [GroupingPanel.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### GroupingPanelItem

Describes grouping panel item properties.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column associated with the item.
draft? | string | The item preview mode. Contains the "add", "remove" or "reorder" value.

### GroupingPanel.ContainerProps

Describes properties passed to a component that renders a group panel container.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the root layout.

### GroupingPanel.ItemProps

Describes properties passed to a group panel item template when it is being rendered.

Field | Type | Description
------|------|------------
item | [GroupingPanelItem](#groupingpanelitem) | The Grouping Panel item.
showGroupingControls | boolean | Specifies whether to display a button that cancels grouping by column.
showSortingControls | boolean | Specifies whether to render controls that toggle the column's sorting state.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the sorting direction.
onSort | (parameters: { direction?: 'asc' &#124; 'desc' &#124; null }) => void | An event that initiates changing the column sorting direction. Cancels sorting by the current column if `direction` is set to null.
onGroup | () => void | An event that initiates grouping by column.

### GroupingPanel.EmptyMessageProps

Describes properties passed to a component that renders an empty group panel message.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in the group panel if grid data is not grouped.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
groupByColumn? | string | 'Drag a column header here to group by that column' | The text displayed in the group panel if the grid is not grouped.

## Plugin Components

Name | Properties | Description
-----|------------|------------
GroupingPanel.Container | [GroupingPanel.ContainerProps](#groupingpanelcontainerprops) | A component that renders a grouping panel container.
GroupingPanel.Item | [GroupingPanel.ItemProps](#groupingpanelitemprops) | A component that renders a grouping panel item.
GroupingPanel.EmptyMessage | [GroupingPanel.EmptyMessageProps](#groupingpanelemptymessageprops) | A component that renders an empty grouping panel message.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
draftGrouping | Getter | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for the preview.
changeColumnGrouping | Action | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the last position.
draftColumnGrouping | Action | ({ columnName: string, groupIndex?: number }) => void | Sets or clears grouping options used for the preview. If `groupIndex` is omitted, the group is added to the last position.
cancelColumnGroupingDraft | Action | () => void | Cancels changes to the column grouping options used for the preview.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
changeColumnSorting | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column.
draggingEnabled | Getter | boolean | Specifies whether drag-and-drop is enabled.
toolbarContent | Template | Object? | A template that renders the toolbar content.

### Exports

none
