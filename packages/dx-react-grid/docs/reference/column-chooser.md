# ColumnChooser Reference

ColumnChooser is a component that allows a user to show and hide grid columns at runtime. The component contains a column list with checkboxes that control each column's visibility. Use the Grid component's [TableColumnVisiblity](table-column-visibility.md) plugin that manages column visibility if you need to associate the ColumnChooser with a Grid.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columns | Array&lt;[Column](grid.md#column)&gt; | | Columns that ColumnsChooser operates on.
hiddenColumns | Array&lt;string&gt; | [] | An array containing hidden column names.
onHiddenColumnsChange | (nextHiddenColumns: Array&lt;string&gt;) => void | | Handles column visibility changes.
containerComponent | ElementType&lt;[ColumnChooserContainerProps](#columnchoosercontainerprops)&gt; | | A component that renders the column chooser container.
itemComponent | ElementType&lt;[ColumnChooserItemProps](#columnchooseritemprops)&gt; | | A component that renders a column chooser item.

## Interfaces

### ColumnChooserContainerProps

Describes properties passed to a component that renders the column chooser container.

A value with the following shape:

Field | Type | Description
------|------|------------
items | Array&lt;[ColumnChooserItem](#columnchooseritem)&gt; | Column chooser items.
onItemToggle | (item: [ColumnChooserItem](#columnchooseritem)) => void | Handles item visibility changes.
children | Array&lt;ReactElement&gt; | React elements used to render column chooser items.

### ColumnChooserItemProps

Describes properties passed to a component that renders a column chooser item.

A value with the following shape:

Field | Type | Description
------|------|------------
item | [ColumnChooserItem](#columnchooseritem) | A column chooser item.
onToggle | () => void | Handles the item visbility changes.

### ColumnChooserItem

An object representing a column chooser item.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The grid column associated with the item.
hidden | boolean | Specifies whether the associated column is hidden.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ColumnChooser.Container | [ColumnChooserContainerProps](#columnchoosercontainerprops) | A component that renders the column chooser container.
ColumnChooser.Item | [ColumnChooserItemProps](#columnchooseritemprops) | A component that renders a column chooser item.

If you specify additional properties, they are added to the component's root element.
