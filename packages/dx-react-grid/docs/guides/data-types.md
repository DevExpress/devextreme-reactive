# Data Types

The Grid component supports custom value formatting and the use of a custom editor for cell value editing (depending on column's data type).

The [DataTypeProvider](../reference/data-type-provider.md) plugin holds the `type`, `formatterTemplate` and `editorTemplate` properties that enable you to associate the data type provider with a data type, specify custom formatting and a custom editor respectively.

Associate a column with a data type using the `Column` object's `dataType` field.

## Related Plugins

- [DataTypeProvider](../reference/data-type-provider.md) - provides the capability to customize formatting and editors depending on the data type

## Value Formatting

Assign a function rendering the formatted value to the `DataTypeProvider` plugin's `formatterTemplate` property to apply the required formatting to cells of a column associated with the specified type.

```js
const rows = [
  { product: 'SolarOne', price: '3039' },
];
const columns = [
  { name: 'product', title: 'Product' },
  { name: 'amount', title: 'Sale Amount', dataType: 'currency' },
];
<Grid
  rows={rows}
  columns={columns}
>
  <DataTypeProvider
    type="currency"
    formatterTemplate={({ value }) => <span>${value}</span>}
  />
</Grid>
```

.embedded-demo(data-types/formatters)

## Custom Editors

If the grid supports editing or header row filtering, assign a function rendering the required editor to the `DataTypeProvider` plugin's `editorTemplate` property. In this case, the Grid uses the specified editor to edit all values of the specified type.

```js
const rows = [
  { product: 'SolarOne', shipped: true },
];
const columns = [
  { name: 'product', title: 'Product' },
  { name: 'shipped', title: 'Shipped', dataType: 'boolean' },
];
<Grid
  rows={rows}
  columns={columns}
>
  <DataTypeProvider
    type="boolean"
    editorTemplate={({ value, onValueChange }) => (
      <select
        value={value}
        onChange={e => onValueChange(e.target.value === 'true')}
      >
        <option value={false}>No</options>
        <option value>Yes</option>
      </select>
    )}
  />
</Grid>
```

.embedded-demo(data-types/editors)
