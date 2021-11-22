# DxTableColumnVisibility Plugin Reference

A plugin that manages Grid columns' visibility.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableColumnVisibility } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableColumnVisibility } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxTable](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
hiddenColumnNames | Array&lt;string&gt; | | Hidden column names.
columnTogglingEnabled? | boolean | true | Specifies whether an end-user can change column visibility.
columnExtensions? | Array&lt;[DxTableColumnVisibility.ColumnExtension](#dxtablecolumnvisibilitycolumnextension)&gt; | | Additional column properties that the plugin can handle.
emptyMessageComponent | [DxTableColumnVisibility.DxEmptyMessage](#dxtablecolumnvisibilitydxemptymessage) | | A component that renders a message that is displayed when all columns are hidden.
messages? | [DxTableColumnVisibility.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### DxTableColumnVisibility.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
togglingEnabled | boolean | Specifies whether an end-user can change column visibility.

## Component Types

### DxTableColumnVisibility.DxEmptyMessage

#### Props

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed when all columns are hidden.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
noColumns? | string | 'Nothing to show' | Specifies the text that is displayed when the plugin does not contain visible columns.

## Plugin Components

Name | Type | Description
-----|------------|------------
DxTableColumnVisibility.components.DxEmptyMessage | [DxTableColumnVisibility.DxEmptyMessage](#dxtablecolumnvisibilitydxemptymessage) | A component that renders a message displayed when all columns are hidden.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
table | Template | object? | A template that renders a table.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Visible table columns.
hiddenColumnNames | Getter | Array&lt;string&gt; | Hidden table column names.
isColumnTogglingEnabled | Getter | (columnName: string) => boolean | A function used to define if an end-user can change column visibility.
toggleColumnVisibility | Action | (columnName: string) => void | Toggles a column's visibility.
