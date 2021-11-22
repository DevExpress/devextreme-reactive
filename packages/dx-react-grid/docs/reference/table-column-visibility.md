# TableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableColumnVisibility } from '@devexpress/dx-react-grid-material-ui';
// import { TableColumnVisibility } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableColumnVisibility } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableColumnVisibility } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumnNames? | Array&lt;string&gt; | | Hidden column names.
defaultHiddenColumnNames? | Array&lt;string&gt; | [] | Names of initially hidden columns in the uncontrolled mode.
columnTogglingEnabled? | boolean | true | Specifies whether an end-user can change column visibility.
columnExtensions? | Array&lt;[TableColumnVisibility.ColumnExtension](#tablecolumnvisibilitycolumnextension)&gt; | | Additional column properties that the plugin can handle.
onHiddenColumnNamesChange? | (hiddenColumnNames: Array&lt;string&gt;) => void | | Handles hidden columns adding or removing.
emptyMessageComponent | ComponentType&lt;[TableColumnVisibility.EmptyMessageProps](#emptymessageprops)&gt; | | A component that renders a message that is displayed when all columns are hidden.
messages? | [TableColumnVisibility.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### TableColumnVisibility.EmptyMessageProps

Describes the empty message component's properties.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed when all columns are hidden.

### TableColumnVisibility.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
togglingEnabled | boolean | Specifies whether an end-user can change column visibility.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
noColumns? | string | 'Nothing to show' | Specifies the text that is displayed when the plugin does not contain visible columns.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableColumnVisibility.EmptyMessage | [TableColumnVisibility.EmptyMessageProps](#emptymessageprops) | A component that renders a message displayed when all columns are hidden.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
table | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders a table.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Visible table columns.
hiddenColumnNames | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;string&gt; | Hidden table column names.
isColumnTogglingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function used to define if an end-user can change column visibility.
toggleColumnVisibility | [Action](../../../dx-react-core/docs/reference/action.md) | (columnName: string) => void | Toggles a column's visibility.
