# TableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumns | Array&lt;string&gt; | [] | Hidden column names.
defaultHiddenColumns | Array&lt;string&gt; | [] | Names of initially hidden columns in uncontrolled mode.
onHiddenColumnsChange | (hiddenColumns: Array&lt;string&gt;) => void | | Handles hidden columns adding or removing.
emptyMessageComponent | ElementType&lt;[EmptyMessageProps](#emptymessageprops)&gt; | | A component that renders a message that is displayed when all columns are hidden.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### EmptyMessageProps

Describes the empty message component's properties.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed when all columns are hidden.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
noColumns? | string | 'Nothing to show' | Specifies the text that is displayed when the plugin does not contain visible columns.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableColumnVisibility.EmptyMessage | [EmptyMessageProps](#emptymessageprops) | A component that renders a message displayed when all columns are hidden.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
table | Template | Object? | A template that renders a table.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Visible table columns.
hiddenColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Hidden table columns.
toggleColumnVisibility | Action | ({ columnName: string }) => void | Toggles a column's visibility.
