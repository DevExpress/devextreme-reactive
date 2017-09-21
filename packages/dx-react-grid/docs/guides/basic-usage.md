# Basic Usage

## Overview

The main purpose of React Grid is showing data passed into it. To specify data that Grid should display you can use the `rows` property.

The next basic property of Data Grid is `columns`. It defines what row fields should be used by Grid.

```js
<Grid
  rows={[
    { region: 'South America', sector: 'Banking' },
    { region: 'Africa', sector: 'Manufacturing' },
    /* ... */
  ]},
  columns={[
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    /* ... */
  ]},
>
</Grid>
```

Actually, the described properties give React Grid information about data.

As for UI, there are two common plugins that allow representing records.

The first one is the [TableView](../reference/table-view.md). It renders data as a simple table:


```js
<Grid
  rows={rows},
  columns={columns},
>
  <TableView />
</Grid>
```

The second is the [TableHeaderRow](../reference/table-header-row.md) plugin. Pay attention, it should be placed after the `TableView`.

```js
<Grid
  rows={rows},
  columns={columns},
>
  <TableView />
  <TableHeaderRow />
</Grid>
```

The following demo shows the basic scenario of React Grid usage.

.embedded-demo(basic/basic)

## Basic Appearance Customization

The `TableView` and `TableHeaderRow` plugins provide the rich API for appearance customization.

Often, it's necessary to use more complex markup instead of plain text within a table cell. For example, in case if you are interested in implementing conditional formatting functionality.

Let's look how to achieve it by using the `tableCellTemplate` property of the `TableView` plugin.+

NOTE: the following code uses Bootstrap 3 templates. If you'd like to use Material UI, replace the `td` tag to `TableCell`.

{% raw %}
```js
<Grid
  rows={rows}
  columns={columns}
>
  <TableView
    tableCellTemplate={({ column, value, style, colSpan }) => (
      (column.name === 'amount' && value < 5000) ?
        <td
          style={{
            backgroundColor: 'red',
            ...style,
          }}
          colSpan={colSpan}
        >
          <span style={{ color: 'white' }}>{value}</span>
        </td>
        : undefined
    )}
  />
  <TableHeaderRow />
</Grid>
```
{% endraw %}

Here we use a custom text color depend on some condition. Otherwise, we return `undefined` to use a default table cell template.

.embedded-demo(basic/table-cell-template)

The second popular scenario is handling row events like `onClick`, `onContextMenu` etc. The `tableRowTemplate` helps to implement such functionality.

For example, let's look how to highlight table rows on hover.

NOTE: the following code uses Bootstrap 3 templates. If you'd like to use Material UI, replace the `tr` tag to `TableRow`.

```js
export default class Demo extends React.PureComponent {
  constructor(props) {
    /* ... */
     this.state = {
       hoveredRowId: null,
       /* ... */
     };
  }
  render() {
    const { rows, columns, hoveredRowId } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <TableView
          tableRowTemplate={({ children, tableRow }) => (
            <tr
              onMouseEnter={() => this.setState({ hoveredRowId: tableRow.rowId })}
              onMouseLeave={() => this.setState({ hoveredRowId: null })}
              className={hoveredRowId === tableRow.rowId ? 'active' : null}
            >
              {children}
            </tr>
          )}
        />
        /* ... */
    </Grid>
    );
  }
}
```

Pay attention, you can use the `children` argument field to avoid manual cells rendering.

.embedded-demo(basic/table-row-template)

Other plugins like [TableHeaderRow](../reference/table-header-row.md), [TableEditRow](../reference/table-edit-row.md), [TableFilterRow](../reference/table-filter-row.md), [TableGroupRow](../reference/table-group-row.md) and [TableRowDetail](../reference/table-row-detail.md) contain the similar API for templates customization.
