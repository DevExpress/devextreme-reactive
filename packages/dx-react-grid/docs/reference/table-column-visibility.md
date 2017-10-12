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
messages | object | | The object specifies [localization messages](#localization-messages).

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
noColumns? | string | 'Nothing to show' | Specifies text shown when the plugin does not contain any visible columns.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Visible table columns.
