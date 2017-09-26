# Grid Reference

ColumnChooser is a component designed to work along with Grid. It displays all available columns and in a combination with the [TableColumnVisibility](table-column-visibility.md) Grid plugin enables an end-user to control which columns should be displayed.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columns | Array&lt;[Column](grid.md#column)&gt; | | Specifies for which row object fields columns are created.
hiddenColumns | Array&lt;string&gt; | [] | An array containing the names of the columns to be hidden.
onHiddenColumnsChange | (nextHiddenColumns: Array&lt;string&gt;) => void | | Handles column visibility change.
contentTemplate | (args: [ColumnChooserRootArgs](#column-chooser-root-args)) => ReactElement | | A template that renders the column chooser markup.

## Interfaces

### <a name="column-chooser-root-args"></a>ColumnChooserRootArgs

Describes properties passed to the root template when it is being rendered.

Field | Type | Description
------|------|------------
columnChooserItems | Array&lt;[ColumnChooserItem](#column-chooser-item)&gt; | An array of column chooser items.
onColumnToggle | (columnName: string) => void | Handles column visibility change.

### <a name="column-chooser-item"></a>ColumnChooserItem

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The related grid column.
hidden | boolean | Specifies whether the related column is hidden or not.

## Plugin Developer Reference

### Exports

none
