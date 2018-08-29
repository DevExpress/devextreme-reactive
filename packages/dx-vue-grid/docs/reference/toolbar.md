# DxToolbar Plugin Reference

A plugin that renders the Grid toolbar.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxToolbar } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxToolbar } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rootComponent | [DxToolbar.DxRoot](#dxtoolbardxroot) | | A component that renders the toolbar root element.

## Component Types

### DxToolbar.DxRoot

#### Slots

Field | Description
------|------------
default | The default Vue slot.

## Plugin Components

Name | Type | Description
-----|------|------------
DxToolbar.components.DxRoot | [DxToolbar.DxRoot](#dxtoolbardxroot) | A component that renders the toolbar root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
header | Template | object? | A template that renders the grid header.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toolbarContent | Template | object? | A template that renders the toolbar content.
