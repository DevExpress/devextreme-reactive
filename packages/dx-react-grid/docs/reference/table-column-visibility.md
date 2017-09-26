# TableColumnVisibility Plugin Reference

Plugin that manages Grid columns visibility. Enables Grid to work along with [ColumnChooser](column-chooser.md).

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumnNames | Array&lt;string&gt; | [] | An array containing the names of the columns to be hidden.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Visible table columns.

