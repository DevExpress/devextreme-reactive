# DataTypeProvider Plugin Reference

A plugin that provides the capability to customize formatting options and editors depending on the data type.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
type | string | | Specifies the data type to which the templates are applied.
formatterComponent | ElementType&lt;[ValueFormatterProps](#valueformatterprops)&gt; | | A component that renders the formatted value.
editorComponent | ElementType&lt;[ValueEditorProps](#valueeditorprops) | | A component that renders a custom editor.

## Interfaces

### <a name="column"></a>Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
dataType | string | Specifies the column's data type.

### ValueFormatterProps

Describes the value formatter component properties.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | A column object.
row? | any | A row.
value | any | Specifies the value to be formatted.

### ValueEditorProps

Describes the editor component properties.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | A column object.
row? | any | A row.
value | any | Specifies the editor value.
onValueChange | (newValue: any) => void | Handles value changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
valueFormatter | Template | [ValueFormatterArgs](#valueformatterprops) | A template that renders a formatted value.
valueEditor | Template | [ValueEditorArgs](#valueeditorprops) | A template that renders an editor.
