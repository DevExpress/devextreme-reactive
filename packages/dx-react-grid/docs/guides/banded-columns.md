# React Grid - Banded Columns

The Grid allows you to organize column headers into bands.

## Related Plugins

The following plugins implement the Banded Columns feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders a grid header with banded cells
- [TableBandHeader](../reference/table-band-header.md) - renders the banded cells

## Basic Setup

Import the plugins listed above and specify the `TableBandHeader` plugin's `columnBands` property to set up a Grid with banded columns. The band nesting level depth is unlimited.

.embedded-demo({ "path": "grid-band-columns/basic", "showThemeSelector": true })

## Customize the Appearance

You can customize the appearance of the header with bands by overriding the `TableBandHeader` and `TableHeaderRow` plugins' `cellComponent` properties:

.embedded-demo({ "path": "grid-band-columns/customization", "showThemeSelector": true })

NOTE: The default `className` property is retained while customizing the `TableHeaderRow` plugin's cell component.
