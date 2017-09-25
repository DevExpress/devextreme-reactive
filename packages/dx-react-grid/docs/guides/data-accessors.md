# Data Accessors

## Cell Value Access

In a common scenario with a simple data structure, you can associate a column with a row data field using the column's `name` field as shown in the following example:

```js
const data = [
  { firstName: 'John', lastName: 'Smith' },
  /* ... */
];
const columns = [
  { name: 'firstName', title: 'First Name' },
  { name: 'lastName', title: 'Last Name' },
  /* ... */
];

<Grid
  data={data}
  columns={columns}
/>
```

In the case of nested data structure, use the `getCellValue` function to calculate a column value as demonstrated below:

```js
const data = [
  { user: { firstName: 'John', lastName: 'Smith' } },
  /* ... */
];
const columns = [
  {
    name: 'firstName',
    title: 'First Name',
    getCellValue: rowData => (rowData.user ? rowData.user.firstName : undefined),
  },
  {
    name: 'lastName',
    title: 'Last Name',
    getCellValue: rowData => (rowData.user ? rowData.user.lastName : undefined),
  },
  /* ... */
];

<Grid
  data={data}
  columns={columns}
/>
```

.embedded-demo(data-accessors/custom-data-accessors-in-columns)

If you use a common value calculation algorithm for all columns, specify the `getCellValue` function on the Grid's level.

For example, you can implement dot notation support for columns like `{ name: 'user.firstName' }`. In this case, the function code looks as follows:

```js
const getCellValue = (rowData, columnName) => {
  if (columnName.indexOf('.') > -1) {
    const { rootField, nestedField } = this.splitColumnName(columnName);
    return rowData[rootField] ? rowData[rootField][nestedField] : undefined;
  }
  return rowData[columnName];
};

<Grid
  data={data}
  columns={columns}
  getCellValue={getCellValue}
>
```

The following demo shows this approach in action:

.embedded-demo(data-accessors/custom-data-accessors)

Note that the Grid's `getCellValue` property has a higher priority than the column's property.

The `getCellValue` implementation presented in this demo is not optimized for frequent invocation. Avoid using it in production apps operating with large amounts of data.

## Cell Value Editing

If editing features are enabled, you can use the column's `createRowChange` function to create a row data changes object:

```js
const data = [
  { user: { firstName: 'John', lastName: 'Smith' } },
  /* ... */
];
const columns = [
  {
    /* ... */
    createRowChange: (rowData, value) => ({
      user: {
        ...rowData.user,
        firstName: value,
      },
    }),
  },
  /* ... */
];
```

Specify the `EditingState` plugin's `createRowChange` property if you use a common algorithm for all columns.

```js
const createRowChange = (rowData, columnName, value) => {
  /* ... */
};

<Grid
  /* ... */
>
  <EditingState
    createRowChange={createRowChange}
  />
/>
```

Note that the `EditingState` plugin's `createRowChange` property has a higher priority than the column's property.
