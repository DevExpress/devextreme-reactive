# DataTypeProvider Plugin Reference

A plugin that provides the capability to customize formatting options and editors depending on the data type.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
for | Array&lt;string&gt; | | The names of columns associated with the specified formatter and editor.
formatterComponent? | ComponentType&lt;[DataTypeProvider.ValueFormatterProps](#datatypeprovidervalueformatterprops)&gt; | | A component that renders the formatted value.
editorComponent? | ComponentType&lt;[DataTypeProvider.ValueEditorProps](#datatypeprovidervalueeditorprops)&gt; | | A component that renders a custom editor.

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

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
valueFormatter | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueFormatterProps](#datatypeprovidervalueformatterprops) | A template that renders the formatted value.
valueEditor | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueEditorProps](#datatypeprovidervalueeditorprops) | A template that renders the editor.
