# TableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumns | Array&lt;string&gt; | [] | Specifies the hidden columns' names.
emptyMessageComponent | ElementType&lt;[EmptyMessageProps](#emptymessageprops)&gt; | | A component that renders a message displayed when all columns are hidden.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### EmptyMessageProps

Describes the empty message component properties.

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
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Visible table columns.
