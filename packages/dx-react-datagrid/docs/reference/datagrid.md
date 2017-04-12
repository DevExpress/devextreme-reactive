# DataGrid Reference

Component that represents data passed to it with help of provided plugins. Does not contain any visual components within. Provides required environment to process passed `rows` and `columns`.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | array&lt;[Row](#row)&gt; | | Specifies rows to be used in plugins
columns | array&lt;[Column](#column)&gt; | | Specifies columns to be used in plugins

## Data Structures

### Row

Describes the row interface

Field | Type | Description
------|------|------------
id | number&#124;string | Specifies row id. Used by plugins to consistently identify row

Note that any other fields can and should be defined. They are used as data that will be represented.

### Column

Describes the column interface

Field | Type | Description
------|------|------------
name | string | Used by plugins to consistently identify column and represent data defined in rows as key.

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => array&lt;[Row](#row)&gt; | Specified rows
columns | Getter | () => array&lt;[Column](#column)&gt; | Specified columns