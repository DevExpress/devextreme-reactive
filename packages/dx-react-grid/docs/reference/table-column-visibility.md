# TableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumns | Array&lt;string&gt; | [] | Specifies the hidden columns' names.
emptyMessageTemplate | () => ReactElement | | A template that renders a message displayed when all columns are hidden.
messages | object | | An object that specifies the [localization messages](#localization-messages).

### <a name="empty-message-args"></a>EmptyMessageArgs

Describes properties passed to the empty message template when it is being rendered.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed when all columns are hidden.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
noColumns? | string | 'Nothing to show' | Specifies the text displayed when the plugin does not contain visible columns.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Visible table columns.
