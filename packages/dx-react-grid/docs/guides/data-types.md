# Data Types

The Grid component supports custom cell formatting and custom editors usage depending on column data type.

## Related Plugins

- [DataTypeProvider](../reference/data-type-provider.md) - the plugin which provides abilities for customization

## Formatting

To format values in cells of a particular column add the [DataTypeProvider](../reference/data-type-provider.md) and set its `type` according to the `dataType` of the column. Then pass the formatting function to the `formatterTemplate` property.

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

## Custom editors

To use custom editors for editing values in a particular column add the [DataTypeProvider](../reference/data-type-provider.md) and set its `type` according to the `dataType` of the column. Then pass the function returning the required editor component to the `editorTemplate` property.

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
      <select value={value} onChange={e => onValueChange(e.target.value)}>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    )}
  />
</Grid>
```

.embedded-demo(data-types/editors)
