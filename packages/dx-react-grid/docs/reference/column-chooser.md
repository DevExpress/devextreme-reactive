# ColumnChooser Reference

ColumnChooser is a component that allows a user to show and hide grid columns at runtime. The component contains a column list with a checkbox that controls each item's related column visibility. Use the Grid component's [TableColumnVisiblity](table-column-visibility.md) plugin that manages column visibility if you need to associate the ColumnChooser with the Grid.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columns | Array&lt;[Column](grid.md#column)&gt; | | Specifies for which row object fields columns are created.
hiddenColumns | Array&lt;string&gt; | [] | An array containing hidden columns' names.
onHiddenColumnsChange | (nextHiddenColumns: Array&lt;string&gt;) => void | | Handles column visibility changes.
containerComponent | ElementType&lt;[ColumnChooserContainerProps](#columnchoosercontainerprops)&gt; | | A component that renders the column chooser container.
itemComponent | ElementType&lt;[ColumnChooserItemProps](#columnchooseritemprops)&gt; | | A component that renders column chooser items.

## Interfaces

### ColumnChooserContainerProps

Describes properties passed to the container template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
items | Array&lt;[ColumnChooserItem](#columnchooseritem)&gt; | An array of column chooser items.
onItemToggle | (item: [ColumnChooserItem](#columnchooseritem)) => void | Handles item visibility changes.

### ColumnChooserItemProps

Describes properties passed to the item template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
item | [ColumnChooserItem](#columnchooseritem) | Specifies the column chooser item.
onToggle | () => void | Handles the item click event.

### ColumnChooserItem

An object representing a column chooser item.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The related grid column.
hidden | boolean | Specifies whether the related column is hidden.
