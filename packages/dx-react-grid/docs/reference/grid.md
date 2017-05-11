# Grid Reference

Grid is a root container component that accepts data via the `rows` property. It provides this data to the hosted plugins specified as child components to preprocess and display it as a table representation. It also accepts the table columns description via the `columns` property.

Initially it does not contain any plugins to display data. So you should specify them depending on your needs. See more details about the [plugins concept](../README.md#plugins-overview).

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | Array&lt;[Row](#row)&gt; | | Specifies rows with data to be rendered
columns | Array&lt;[Column](#column)&gt; | | Specifies row fields to be rendered as columns
getRowId | (row: [Row](#row)) => number &#124; string | null | Specifies the function used to get a unique row identifier.

## Interfaces

### Row

A data object to be represented as a Grid row

Note that any number of other fields can be specified. The fields are used as data to be displayed within the Grid.

### Column

Describes the column interface

A value with the following shape:

Field | Type | Description
------|------|------------
name | string | Specifies the field name in the data row to obtain a column value. A unique key can be also used to identify a particular column

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](#row)&gt; | Specified rows
columns | Getter | () => Array&lt;[Column](#column)&gt; | Specified columns
