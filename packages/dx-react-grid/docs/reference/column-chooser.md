# ColumnChooser Reference

ColumnChooser is a component designed to work along with Grid. It displays all available columns and in a combination with the [TableColumnVisibility](table-column-visibility.md) Grid plugin enables an end-user to control which columns should be displayed.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columns | Array&lt;[Column](grid.md#column)&gt; | | Specifies for which row object fields columns are created.
hiddenColumns | Array&lt;string&gt; | [] | An array containing the names of the columns to be hidden.
onHiddenColumnsChange | (nextHiddenColumns: Array&lt;string&gt;) => void | | Handles column visibility change.
contentTemplate | (args: [ColumnChooserContentArgs](#column-chooser-content-args)) => ReactElement | | A template that renders the column chooser markup.
itemTemplate | (args: [ColumnChooserItemArgs](#column-chooser-item-args)) => ReactElement | | A template that renders column chooser items.

## Interfaces

### <a name="column-chooser-content-args"></a>ColumnChooserContentArgs

Describes properties passed to the content template when it is being rendered.

A value of the following shape:

Field | Type | Description
------|------|------------
items | Array&lt;[ColumnChooserItem](#column-chooser-item)&gt; | An array of column chooser items.
onItemToggle | (item: [ColumnChooserItem](#column-chooser-item), toggle: boolean) => void | Handles item visibility change.

### <a name="column-chooser-item-args"></a>ColumnChooserItemArgs

Describes properties passed to the item template when it is being rendered.

A value of the following shape:

Field | Type | Description
------|------|------------
item | [ColumnChooserItem](#column-chooser-item) | Specifies the column chooser item.
onToggle | (toggle: boolean) => void | Handles the item click event.

### <a name="column-chooser-item"></a>ColumnChooserItem

An object representing a column chooser item.

A value of the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The related grid column.
hidden | boolean | Specifies whether the related column is hidden or not.

## Plugin Developer Reference

### Exports

none
