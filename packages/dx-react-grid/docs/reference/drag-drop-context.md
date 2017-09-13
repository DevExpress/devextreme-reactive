# DragDropContext Plugin Reference

This plugin implements the drag-and-drop functionality and visualizes columns being dragged.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerTemplate | (args: [ContainerArgs](#container-args)) => ReactElement | | A template that renders a container for columns being dragged.
columnTemplate | (args: [ColumnArgs](#column-args)) => ReactElement | | A template that renders a column being dragged.

## Interfaces

### <a name="column"></a>Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
title? | string | Specifies a table column title.

### <a name="container-args"></a>ContainerArgs

Describes properties passed to a template that renders a container for columns being dragged.

A value with the following shape:

Field | Type | Description
------|------|------------
clientOffset | { x: number, y: number } | The current offset of a column being dragged, against the application's client area.
columns | Array&lt;[Column](#column)&gt; | Columns being dragged.
columnTemplate | (args: [ColumnArgs](#column-args)) => ReactElement | A template rendering columns being dragged.

### <a name="column-args"></a>ColumnArgs

Describes properties passed to a template rendering a column being dragged.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | Specifies a column being dragged.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](#column)&gt; | Columns available for dragging.
root | Template | Object? | A template that renders the grid's root layout.

### Exports

none
