# Data Accessors

## Cell Data Access

In a common scenario with a simple data structure, you can associate a column with a row field using the column's `name` field as shown in the following example:

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

In the case of nested data structure, use the `getCellData` function to calculate a column value as demonstrated below:

```js
const rows = [
  { user: { firstName: 'John', lastName: 'Smith' } },
  ...
];
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

If you use a common data calculation algorithm for all columns, specify the `getCellData` function on the Grid's level.

For example, you can implement dot notation support for columns like `{ name: 'user.firstName' }`. In this case, the function code looks as follows:

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

The following demo shows this approach in action:

.embedded-demo(data-accessors/custom-data-accessors)

Note that the Grid's `getCellData` property has a higher priority than the column's property.

The `getCellData` implementation presented in this demo is not optimized for frequent invocation. Avoid using it in production apps operating with large amounts of data.

## Cell Data Editing

If editing features are enabled, you can use the column's `createRowChange` function to create a row changes object:

```js
const rows = [
  { user: { firstName: 'John', lastName: 'Smith' } },
  ...
];

const columns: [
  {
    ...
    createRowChange: (row, value) => ({
      user: {
        ...row.user,
        firstName: value,
      },
    }),
  },
  ...
]
```

Specify the `EditingState` plugin's `createRowChange` property if you use a common algorithm for all columns.

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

Note that the `EditingState` plugin's `createRowChange` property has a higher priority than the column's property.
