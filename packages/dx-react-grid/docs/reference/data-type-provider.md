# DataTypeProvider Plugin Reference

A plugin that allows you to customize formatting options and editors depending on the data type.

## Import

Use the following statement to import the plugin:

```js
import { DataTypeProvider } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
for | Array&lt;string&gt; | | The names of columns associated with the specified formatter and editor.
formatterComponent? | ComponentType&lt;[DataTypeProvider.ValueFormatterProps](#datatypeprovidervalueformatterprops)&gt; | | A component that renders the formatted value.
editorComponent? | ComponentType&lt;[DataTypeProvider.ValueEditorProps](#datatypeprovidervalueeditorprops)&gt; | | A component that renders a custom editor.
availableFilterOperations? | Array&lt;[FilterOperation](filtering-state.md#filteroperation)&gt; | | The names of filter operations that are available for the associated columns.

## Interfaces

### DataTypeProvider.ValueFormatterProps

Describes properties passed to a component that renders the formatted value.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row? | any | A row.
value | any | The value to be formatted.

### DataTypeProvider.ValueEditorProps

Describes properties passed to a component that renders the value editor.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row? | any | A row.
value | any | Specifies the editor value.
onValueChange | (newValue: any) => void | Handles value changes.
disabled | boolean | **true** if users should not be able to edit the value, **false** otherwise.
autoFocus | boolean | **true** if editor should be focused on render, **false** otherwise.
onBlur | () => void | Switches editor from editing state on editor lose focus (uses for Inline Cell Editing).
onFocus | () => void | Apply action on editor get focus (uses for Inline Cell Editing).
onKeyDown | () => void | Handles key press: Enter to save changes, or Esc to discard the changes and deactivate the cell editor (uses for Inline Cell Editing).

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
getAvailableFilterOperations | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => Array&lt;string&gt;? | A function that returns the names of filter operations available for a particular column.
valueFormatter | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueFormatterProps](#datatypeprovidervalueformatterprops) | A template that renders the formatted value.
valueEditor | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueEditorProps](#datatypeprovidervalueeditorprops) | A template that renders the editor.
