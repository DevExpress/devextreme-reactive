# Data Accessors

## Cell Data Access

In order, to specify the field name in the data row to obtain a column value a user can use the `column.name` field. It's enough for common scenarios, when a data structure is quite simple. For example:

```js
const rows = [
  { firstName: 'John', lastName: 'Smith' },
  ...
];
const columns = [
  { name: 'firstName', title: 'First Name' },
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
  { user: { firstName: 'John', lastName: 'Smith' } },
  ...
];
```

To tell the Grid how to work with this data you can use the `column.getCellData` function like below:

```js
<Grid
  rows={rows},
  columns: [
    {
      name: 'firstName',
      title: 'First Name',
      getCellData: row => (row.user ? row.user.firstName : undefined),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      getCellData: row => (row.user ? row.user.lastName : undefined),
    },
    ...
  ],
/>
```

.embedded-demo(data-accessors/custom-data-accessors-in-columns)

In case when you have a common algorithm for cell data calculation, it's possible to use the similar `getCellData` property of the Grid.

Let's say, there are rows like `{ user: { firstName: 'John', lastName: '...' } }`. In order to avoid copying the `getCellData` function for an each column, you can use the dot notation for column name like `{ name: 'user.firstName' }`. Then, the code can look like this:

```js
 <Grid
  rows={rows}
  columns={columns}
  getCellData={(row, columnName) => {
    if (columnName.indexOf('.') > -1) {
      const { rootField, nestedField } = this.splitColumnName(columnName);
      return row[rootField] ? row[rootField][nestedField] : undefined;
    }
    return row[columnName];
  }}
>
```

The following demo shows this approach in action.

.embedded-demo(data-accessors/custom-data-accessors)


Pay attention, the `getCellData` property of the Grid has a higher priority than the `column.getCellData` one.

Since the `getCellData` method is called lots of times it should be implemented in an optimal way. This demo code shouldn't be used in productions apps with a large amount of data.

## Cell Data Editing

 When the editing features are enabled you can use the `column.createRowChange` function and manually create a row change:

```js
const rows = [
  { user: { firstName: 'John', lastName: 'Smith' } },
  ...
];

const columns: [
  {
    ...
    createRowChange: (row, columnName, value) => ({
      user: {
        ...row.user,
        firstName: value,
      },
    }),
  },
  ...
]
```

Of course, you should not define the similar functions for an each column. There is the `createRowChange` property of the `EditingState` plugin that allows to implement the same functionality:

```js
<Grid
  ...
>
  <EditingState
    createRowChange={(row, columnName, value) => {
      // ...
    }}
  />
/>
```

Pay attention, the `createRowChange` property of the `EditingState` plugin has a higher priority than the `column.createRowChange` one.
