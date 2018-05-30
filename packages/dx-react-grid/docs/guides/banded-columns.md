# React Grid - Banded Columns

The Grid allows organization of column headers into bands.

## Related Plugins

The following plugins implement the Banded Columns feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders the the grid header with banded cells
- [TableBandHeader](../reference/table-band-header.md) - renders the banded cells

## Basic Setup

Import the plugins listed above and specify the `TableBandHeader` plugin's `columnBands` property to set up a Grid with banded columns. The depth of band nesting level is unlimited.

.embedded-demo({ "path": "grid-band-columns/basic", "showThemeSelector": true })

## Appearance Customization

The `TableBandHeader` plugin allows you to customize the appearance of the header with bands by using the plugin's [properties](../reference/table-band-header.md#properties). The following example demonstrates how to use the `cellComponent` property for customize banded cells and how to use the the `TableHeaderRow` plugin's property `cellComponent` for customize header cells:

.embedded-demo({ "path": "grid-band-columns/customization", "showThemeSelector": true })

NOTE: while customize the `TableHeaderRow` plugin's property `cellComponent` with the Banded Columns feature should spread a `className` property.
