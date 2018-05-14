# DxDataTypeProvider Plugin Reference

A plugin that provides the capability to customize formatting options and editors depending on the data type.

## Importing

Use the following import statement:

```js
import { DxDataTypeProvider } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
for | Array&lt;string&gt; | | The names of columns associated with the specified formatter and editor.
formatterComponent? | [DxDataTypeProvider.DxValueFormatter](#dxdatatypeproviderdxvalueformatter) | | A component that renders the formatted value.
editorComponent? | [DxDataTypeProvider.DxValueEditor](#dxdatatypeproviderdxvalueeditor) | | A component that renders a custom editor.

## Components

### DxDataTypeProvider.DxValueFormatter

Describes properties passed to a component that renders the formatted value.

#### Props

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row? | any | A row.
value | any | The value to be formatted.

### DxDataTypeProvider.DxValueEditor

Describes properties and events passed to a component that renders the value editor.

#### Props

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row? | any | A row.
value | any | Specifies the editor value.

#### Events

Field | Type | Description
------|------|------------
valueChange | (newValue: any) => void | Handles value changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
valueFormatter | Template | [DxDataTypeProvider.DxValueFormatter](#dxdatatypeproviderdxvalueformatter) | A template that renders the formatted value.
valueEditor | Template | [DxDataTypeProvider.DxValueEditor](#dxdatatypeproviderdxvalueeditor) | A template that renders the editor.
