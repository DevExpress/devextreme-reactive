# GroupingPanel Plugin Reference

A plugin that renders the Grouping Panel in the Grid's header. This panel displays grouped columns and allows a user to modify grouping options.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and render sorting indicators.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]
- [GroupingState](grouping-state.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
allowSorting | boolean | false | Specifies whether an end-user can sort data by a column. Requires the [SortingState](sorting-state.md) dependency.
showGroupingControls | boolean | false | Specifies whether column headers display a button that cancels grouping by that column.
containerComponent | ElementType&lt;[GroupingPanelContainerProps](#groupingpanelcontainerprops)&gt; | | A component that renders a group panel container.
itemComponent | ElementType&lt;[GroupingPanelItemProps](#groupingpanelitemprops)&gt; | | A component that renders a group panel item.
emptyMessageComponent | ElementType&lt;[GroupingPanelEmptyMessageProps](#groupingpanelemptymessageprops)&gt; | | A component that renders an empty group panel message.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### GroupingPanelItem

Describes grouping panel item properties.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column associated with the item.
draft? | string | The item preview mode. Contains the "add", "remove" or "reorder" value.

### GroupingPanelContainerProps

Describes properties passed to a component that renders a group panel container.

Field | Type | Description
------|------|------------
children? | ReactElement | A React element to be placed in the root layout.

### GroupingPanelItemProps

Describes properties passed to a group panel item template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
item | [GroupingPanelItem](#groupingpanelitem) | The Grouping Panel item.
showGroupingControls | boolean | Specifies whether to display a button that cancels grouping by the column.
allowSorting | boolean | Specifies whether an end-user can sort data by the column while it is in the grouping panel.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the sorting direction.
onSort | ({ keepOther: boolean, cancel: boolean }) => void | An event that initiates changing column's sorting direction. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `cancel` is set to true.
onGroup | () => void | An event that initiates grouping by the column.

### GroupingPanelEmptyMessageProps

Describes properties passed to a component that renders a group panel empty message.

A value with the following shape:

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in the group panel if grid data is not grouped.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
groupByColumn? | string | 'Drag a column header here to group by that column' | The text displayed in the group panel if the grid is not grouped.

## Plugin Components

Name | Properties | Description
-----|------------|------------
GroupingPanel.Container | [GroupingPanelContainerProps](#groupingpanelcontainerprops) | A component that renders a grouping panel container.
GroupingPanel.Item | [GroupingPanelItemProps](#groupingpanelitemprops) | A component that renders a grouping panel item.
GroupingPanel.EmptyMessage | [GroupingPanelEmptyMessageProps](#groupingpanelemptymessageprops) | A component that renders an empty grouping panel message.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
draftGrouping | Getter | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for the preview.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
groupByColumn | Action | ({ columnName: string }) => void | Toggles the column's grouping state.
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean &#124; Array&lt;String&gt;, cancel: boolean }) => void | Changes a column's sort direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `cancel` to `true` to cancel sorting by the current column.
draftGroupingChange | Action | ({ columnName: string, groupIndex?: number }) => void | Sets the groupingChange state to the specified value.
cancelGroupingChange | Action | () => void | Resets the groupingChange state.
toolbarContent | Template | Object? | A template that renders the toolbar content.

### Exports

none
