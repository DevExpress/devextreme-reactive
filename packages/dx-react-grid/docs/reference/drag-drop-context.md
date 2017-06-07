# DragDropContext Plugin Reference

This plugin enables drag-and-drop feature and visualizes dragging process.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerTemplate | (args: [ContainerArgs](#container-args)) => ReactElement | | A template that renders a container for dragging items
columnTemplate | (args: [ColumnArgs](#column-args)) => ReactElement | | A template that renders a dragging column

## Interfaces

### <a name="container-args"></a>ContainerArgs

Describes properties passed to the template that renders a container for dragging items.

A value with the following shape:

Field | Type | Description
------|------|------------
clientOffset | { x: number, y: number } | Current screen offset of dragged items
columns | Array&lt;[Column](grid.md#column)&gt; | Columns being drugged
columnTemplate | (args: [ColumnArgs](#column-args)) => ReactElement | A template that should be applied to dragging columns

### <a name="column-args"></a>ColumnArgs

Describes properties passed to a template that renders a dragging column inside the container.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | Specifies a table column

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | () => Array&lt;[Column](grid.md#column)&gt; | Columns that can be dragged

### Exports

none
