# DataTypeProvider Plugin Reference

A plugin that allows data formatting and editors customization.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
type | string | | Specifies the column dataType to which templates will be applied.
formatterTemplate | (args: [ValueFormatterArgs](#value-formatter-args)) => ReactElement | | Specifies the template to be used for data formatting.
editorTemplate | (args: [ValueEditorArgs](#value-editor-args)) => ReactElement | | Specifies editor template.

## Interfaces

### <a name="value-formatter-args"></a>ValueFormatterArgs

Describes properties passed to the formatter template.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row | [Row](grid.md#row) | A row object.
value | any | Specifies the value to be formatted.

### <a name="value-editor-args"></a>ValueEditorArgs

Describes properties passed to the editor template.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
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
