# Data Accessors

## Overview

In order, to specify the field name in the data row to obtain a column value a user can use the `column.name` field. It's enough for common scenarios, when a data structure is quite simple. For example:

```js
const rows = [
  { firstName: 'John', lastName: 'Smith', age: 23 },
  ...
];
const columns = [
  { name: 'firstName', title: 'Last Name' },
  { name: 'lastName', title: 'Last Name' },
  ...
];
<Grid
  rows={rows},
  columns={columns}
/>
```

But, in case when a data has a nested structure this approach doesn't work. Let's look at this data set:

```js
const rows = [
  { user: { firstName: 'John', lastName: 'Smith', age: 23 } },
  ...
];
```

To tell the Grid how to work with this data you can use the `getCellData` function:

```js
<Grid
  rows={rows},
  columns={[
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    ...
  ]},
  getCellData={(row, columnName) => {
    switch (columnName) {
      case 'firstName': return row.user ? row.user.firstName : undefined;
      case 'lastName': return row.user ? row.user.lastName : undefined;
      default: return row[columnName];
    }
  }}
/>
```

This piece of code demonstrates how to use a nested object field to get a cell data. Of course, a user can implement more complex logic there.

Moreover, it's possible to use the similar way to set a cell data when the editing features are enabled:

```js
<Grid
  rows={rows},
  columns={[
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    ...
  ]},
  createRowChange={(row, columnName, value) => {
    switch (columnName) {
      case 'firstName': return { user: { firstName: value } };
      case 'lastName': return { user: { lastName: value } };
      default: return { [columnName]: value };
    }
  }}
/>
```

The following demo shows these approaches in action.

.embedded-demo(data-processing/custom-data-accessors)

Pay attention, you can use the column configuration to implement the same functionality:

```js
<Grid
  rows={rows},
  columns: [
    {
      name: 'firstName',
      title: 'First Name',
      getCellData: row => (row.user ? row.user.firstName : undefined),
      createRowChange: (row, value) => ({ user: { firstName: value } }),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      getCellData: row => (row.user ? row.user.lastName : undefined),
      createRowChange: (row, value) => ({ user: { lastName: value } }),
    },
    ...
  ],
/>
```

.embedded-demo(data-processing/custom-data-accessors-in-columns)
