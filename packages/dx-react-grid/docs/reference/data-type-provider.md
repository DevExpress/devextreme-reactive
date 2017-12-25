# DataTypeProvider Plugin Reference

A plugin that provides the capability to customize formatting options and editors depending on the data type.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
for | Array&lt;string&gt; | | The names of columns associated with the specified formatter and editor.
formatterComponent | ElementType&lt;[ValueFormatterProps](#valueformatterprops)&gt; | | A component that renders the formatted value.
editorComponent | ElementType&lt;[ValueEditorProps](#valueeditorprops)&gt; | | A component that renders a custom editor.

## Interfaces

### ValueFormatterProps

Describes properties passed to a component that renders the formatted value.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row? | any | A row.
value | any | The value to be formatted.

### ValueEditorProps

Describes properties passed to a component that renders the value editor.

A value with the following shape:

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
valueFormatter | Template | [ValueFormatterProps](#valueformatterprops) | A template that renders the formatted value.
valueEditor | Template | [ValueEditorProps](#valueeditorprops) | A template that renders the editor.
