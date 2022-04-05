# GroupingPanel Plugin Reference

A plugin that renders the Grouping Panel in the Grid's header. This panel displays grouped columns and allows a user to modify grouping options.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and render sorting indicators.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { GroupingPanel } from '@devexpress/dx-react-grid-material-ui';
// import { GroupingPanel } from '@devexpress/dx-react-grid-bootstrap4';
// import { GroupingPanel } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { GroupingPanel } from '@devexpress/dx-react-grid';
```

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

Describes the grouping panel item properties.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column associated with the item.
draft? | boolean | Specifies if the item is in preview mode.

### GroupingPanel.ContainerProps

Describes properties passed to a component that renders a group panel container.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the root layout.
forwardedRef? | React.RefObject&lt;typeof Element&gt; &#124; (ref: React.RefObject&lt;typeof Element&gt;) => void  | A reference to the group panel container or a function that accepts it.

### GroupingPanel.ItemProps

Describes properties passed to a group panel item template when it is being rendered.

Field | Type | Description
------|------|------------
item | [GroupingPanelItem](#groupingpanelitem) | The Grouping Panel item.
showGroupingControls | boolean | Specifies whether to display a button that cancels grouping by column.
showSortingControls | boolean | Specifies whether to render controls that toggle the column's sorting state.
groupingEnabled | boolean | Specifies whether grouping by a column is enabled.
sortingEnabled | boolean | Specifies whether sorting by a column is enabled.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the sorting direction.
onSort | (parameters: { direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean }) => void | An event that initiates changing the column sorting direction. Cancels sorting by the current column if `direction` is set to null.
onGroup | () => void | An event that initiates grouping by column.
forwardedRef? | React.RefObject&lt;typeof Element&gt; &#124; (ref: React.RefObject&lt;typeof Element&gt;) => void  | A reference to the group panel item or a function that accepts it.

### GroupingPanel.EmptyMessageProps

Describes properties passed to a component that renders an empty group panel message.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in the group panel if grid data is not grouped.
forwardedRef? | React.RefObject&lt;typeof Element&gt; &#124; (ref: React.RefObject&lt;typeof Element&gt;) => void  | A reference to the group panel message or a function that accepts it.

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

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
draftGrouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for the preview.
changeColumnGrouping | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the last position.
draftColumnGrouping | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, groupIndex?: number }) => void | Sets or clears grouping options used for the preview. If `groupIndex` is omitted, the group is added to the last position.
cancelColumnGroupingDraft | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Cancels changes to the column grouping options used for the preview.
sorting | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
changeColumnSorting | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column.
isColumnSortingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function that returns a Boolean value that defines if sorting by a column is enabled.
isColumnGroupingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function that returns a Boolean value that defines if grouping by a column is enabled.
draggingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether drag-and-drop is enabled.
toolbarContent | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the toolbar content.

### Exports

none
