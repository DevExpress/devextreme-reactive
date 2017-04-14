# DataGrid Reference

Component that presents a tabular view of data.

DataGrid is an plugin host. This means that data passed to it is displayed with help of provided plugins.

At starting point it does not contain any plugins to present data. So you should specify them depending on your needs. See more information about plugins: [Plugins Overview](../README.md#plugins-overview).

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | Array&lt;[Row](#row)&gt; | | Specifies rows with data to be rendered
columns | Array&lt;[Column](#column)&gt; | | Specifies a row fields to be rendered as columns

## Interfaces

### Row

Describes the row interface

A value with the following shape:

Field | Type | Description
------|------|------------
id | number &#124; string | Specifies row id. Used by plugins to consistently identify row

Note that any other fields can and should be defined. They are used as data that will be represented.

### Column

Describes the column interface

A value with the following shape:

Field | Type | Description
------|------|------------
name | string | Specifies key by which cell data is accessed from rows. Used by plugins to consistently identify column

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](#row)&gt; | Specified rows
columns | Getter | () => Array&lt;[Column](#column)&gt; | Specified columns
