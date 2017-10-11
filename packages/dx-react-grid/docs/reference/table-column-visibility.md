# TableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumns | Array&lt;string&gt; | [] | Specifies the hidden columns' names.
emptyMessageTemplate | () => ReactElement | | A template that renders a message displayed when all columns are hidden.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Visible table columns.

