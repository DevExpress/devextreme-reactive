# Vue Grid - Fundamentals

The Grid component displays data specified via the `rows` property. You should also specify the `columns` property to define for which row fields the grid creates columns.

The Grid requires the following plugins for basic data visualization:

- [DxTable](../reference/table.md) - renders a data table
- [DxTableHeaderRow](../reference/table-header-row.md) - renders the table's header row

The `DxTableHeaderRow` plugin should follow the `DxTable` plugin. See the [Plugin Order](plugin-overview.md#plugin-order) article for more details.

.embedded-demo({ "path": "grid-basic/basic", "showThemeSelector": true })

## Appearance Customization

The Grid's visualization plugins provide a rich API to customize grid elements' appearance. Examples of the most popular customization tasks are described below.

The `DxTable` plugin allows you to customize the appearance of the table, table head and table body using the plugin's `tableComponent`, `headComponent`, `bodyComponent` and `containerComponent` [properties](../reference/table.md/#properties). The following example demonstrated how to use the `tableComponent` and create a 'striped' table:

.embedded-demo({ "path": "grid-basic/table-template", "showThemeSelector": true })

### Cells

The `DxTable` plugin also allows you to customize table cell appearance using the `cellComponent` property. For instance, you can implement conditional cell formatting as demonstrated in the following example:

.embedded-demo({ "path": "grid-basic/table-cell-template", "showThemeSelector": true })

### Rows

The `DxTable` plugin's `rowComponent` property enables you to handle row events like `click`, `contextmenu`, etc., as demonstrated in the following demo:

.embedded-demo({ "path": "grid-basic/table-row-template", "showThemeSelector": true })

You can create a custom appearance from scratch or modify the default appearance settings the grid's `DxTable.components.DxRow` component provides. Read [Plugin Components](../reference/table.md#plugin-components) for details.

### Column alignment

The `DxTable` plugin's `columnExtensions` allows you to specify the column alignment.

.embedded-demo({ "path": "grid-basic/column-alignment", "showThemeSelector": true })

### Column width

Static widths for specific columns can be defined via the `DxTable` plugin's `columnExtensions` property as shown in the demo below:

.embedded-demo({ "path": "grid-basic/static-column-width", "showThemeSelector": true })

### Multiline cells

The Grid cuts off values that do not fit in a cell. Assign true to the `DxTable` plugin's `columnExtensions.wordWrapEnabled` property for the required column to enable word wrap.

.embedded-demo({ "path": "grid-basic/cell-wordwrap", "showThemeSelector": true })

### Other plugins

Other plugins ([DxTableHeaderRow](../reference/table-header-row.md), [DxTableEditRow](../reference/table-edit-row.md), [DxTableFilterRow](../reference/table-filter-row.md), [DxTableGroupRow](../reference/table-group-row.md) and [DxTableRowDetail](../reference/table-row-detail.md)) have a similar APIs for appearance customization.
