# TableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumnNames | Array&lt;string&gt; | | Hidden column names.
defaultHiddenColumnNames | Array&lt;string&gt; | [] | Names of initially hidden columns in the uncontrolled mode.
columnTogglingEnabled | boolean | true | Specifies whether an end-user can change column visibility.
columnExtensions | Array&lt;[TableColumnVisibilityColumnExtension](#tablecolumnvisibilitycolumnextension)&gt; | | Additional column properties that the plugin can handle.
onHiddenColumnNamesChange | (hiddenColumnNames: Array&lt;string&gt;) => void | | Handles hidden columns adding or removing.
emptyMessageComponent | ElementType&lt;[EmptyMessageProps](#emptymessageprops)&gt; | | A component that renders a message that is displayed when all columns are hidden.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### EmptyMessageProps

Describes the empty message component's properties.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed when all columns are hidden.

### TableColumnVisibilityColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
togglingEnabled | boolean | Specifies whether an end-user can change column visibility.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
noColumns? | string | 'Nothing to show' | Specifies the text that is displayed when the plugin does not contain visible columns.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableColumnVisibility.EmptyMessage | [EmptyMessageProps](#emptymessageprops) | A component that renders a message displayed when all columns are hidden.

Additional properties are added to the component's root element.

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
hiddenColumnNames | Getter | Array&lt;string&gt; | Hidden table column names.
isColumnTogglingEnabled | Getter | (columnName: string) => boolean | A function used to define if an end-user can change column visibility.
toggleColumnVisibility | Action | ({ columnName: string }) => void | Toggles a column's visibility.
