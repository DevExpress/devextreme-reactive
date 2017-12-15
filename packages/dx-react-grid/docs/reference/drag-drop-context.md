# DragDropContext Plugin Reference

A plugin that implements the drag-and-drop functionality and visualizes columns that are being dragged.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerComponent | ElementType&lt;[ContainerProps](#containerprops)&gt; | | A component that renders a container for columns being dragged.
columnComponent | ElementType&lt;[ColumnProps](#columnprops)&gt; | | A component that renders a column being dragged.

## Interfaces

### ContainerProps

Describes properties of the component that renders a container for columns being dragged.

A value with the following shape:

Field | Type | Description
------|------|------------
clientOffset | { x: number, y: number } | The current offset of a column that is being dragged. The offset is measured against the application's client area.
children | ReactElement &#124; Array&lt;ReactElement&gt; | A React element or a React element array representing columns being dragged.

### ColumnProps

Describes properties of the component that renders a column being dragged.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | Specifies a column being dragged.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DragDropContext.Container | [ContainerProps](#containerprops) | A component that renders a container for columns being dragged.
DragDropContext.Column | [ColumnProps](#columnprops) | A component that renders a column being dragged.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns available for dragging.
root | Template | Object? | A template that renders the grid's root layout.

### Exports

none
