# DragDropProvider Plugin Reference

A plugin that implements the drag-and-drop functionality and visualizes columns that are being dragged.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerComponent | ComponentType&lt;[DragDropProvider.ContainerProps](#dragdropprovidercontainerprops)&gt; | | A component that renders a container for columns being dragged.
columnComponent | ComponentType&lt;[DragDropProvider.ColumnProps](#dragdropprovidercolumnprops)&gt; | | A component that renders a column being dragged.

## Interfaces

### DragDropProvider.ContainerProps

Describes properties of the component that renders a container for columns being dragged.

Field | Type | Description
------|------|------------
clientOffset | { x: number, y: number } | The current offset of a column that is being dragged. The offset is measured against the application's client area.
children | ReactNode | A React node representing columns being dragged.

### DragDropProvider.ColumnProps

Describes properties of the component that renders a column being dragged.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | Specifies a column being dragged.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DragDropProvider.Container | [DragDropProvider.ContainerProps](#dragdropprovidercontainerprops) | A component that renders a container for columns being dragged.
DragDropProvider.Column | [DragDropProvider.ColumnProps](#dragdropprovidercolumnprops) | A component that renders a column being dragged.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns available for dragging.
root | Template | Object? | A template that renders the grid's root layout.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
draggingEnabled | Getter | boolean | Specifies whether drag-and-drop is enabled.
