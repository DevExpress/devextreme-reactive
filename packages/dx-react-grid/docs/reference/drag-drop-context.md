# DragDropContext Plugin Reference

This plugin enables the drag-and-drop feature and visualizes the dragging process.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerTemplate | (args: [ContainerArgs](#container-args)) => ReactElement | | A template that renders a container for dropping items
columnTemplate | (args: [ColumnArgs](#column-args)) => ReactElement | | A template that renders a column being dragged

## Interfaces

### <a name="container-args"></a>ContainerArgs

Describes properties passed to a template that renders a container for dropping items.

A value with the following shape:

Field | Type | Description
------|------|------------
clientOffset | { x: number, y: number } | Current screen offset of dragged items
columns | Array&lt;[Column](grid.md#column)&gt; | Columns being dragged
columnTemplate | (args: [ColumnArgs](#column-args)) => ReactElement | A template applied to columns being dragged

### <a name="column-args"></a>ColumnArgs

Describes properties passed to a template that renders a column being dragged inside the container for dropping items.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | Specifies a table column

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns available for dragging
root | Template | Object? | A template that renders the grid's root layout

### Exports

none
