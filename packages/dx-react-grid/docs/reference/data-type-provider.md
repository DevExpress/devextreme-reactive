# DataTypeProvider Plugin Reference

A plugin that provides the capability to customize formatting options and editors depending on the data type.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
type | string | | Specifies the data type to which the templates are applied.
formatterTemplate | (args: [ValueFormatterArgs](#value-formatter-args)) => ReactElement | | Specifies the formatted value template.
editorTemplate | (args: [ValueEditorArgs](#value-editor-args)) => ReactElement | | Specifies the editor template.

## Interfaces

### <a name="column"></a>Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
dataType | string | Specifies the column's data type.

### <a name="value-formatter-args"></a>ValueFormatterArgs

Describes properties passed to the formatter template.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | A column object.
row | [Row](grid.md#row) | A row object.
value | any | Specifies the value to be formatted.

### <a name="value-editor-args"></a>ValueEditorArgs

Describes properties passed to the editor template.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | A column object.
row | [Row](grid.md#row) | A row object.
value | any | Specifies the editor value.
onValueChange | (newValue: any) => void | Handles value changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
valueFormatter | Template | [ValueFormatterArgs](#value-formatter-args) | A template that renders a formatted value.
valueEditor | Template | [ValueEditorArgs](#value-editor-args) | A template that renders an editor.
