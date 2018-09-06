# DxDataTypeProvider Plugin Reference

A plugin that provides the capability to customize formatting options and editors depending on the data type.

## Import

Use the following statement to import the plugin:

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
availableFilterOperations? | Array&lt;[FilterOperation](filtering-state.md#filteroperation)&gt; | | The names of filter operations that are available for the associated columns.

## Component Types

### DxDataTypeProvider.DxValueFormatter

#### Props

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object.
row? | any | A row.
value | any | The value to be formatted.

### DxDataTypeProvider.DxValueEditor

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
