# Vue Grid - Banded Columns

The Grid allows organizing column headers into bands.

## Related Plugins

The following plugins implement the Banded Columns feature:

- [DxTableHeaderRow](../reference/table-header-row.md) - renders the the grid header with banded cells
- [DxTableBandHeader](../reference/table-band-header.md) - renders the banded cells

## Basic Setup

Import the plugins listed above and specify the `DxTableBandHeader` plugin's `columnBands` property to set up a Grid with banded columns. The band's nesting depth is unlimited.

.embedded-demo({ "path": "grid-band-columns/basic", "showThemeSelector": true })

## Appearance Customization

You can customize the appearance of the header with bands by overriding the `DxTableBandHeader` and `DxTableHeaderRow` plugins' `cellComponent` properties:

.embedded-demo({ "path": "grid-band-columns/customization", "showThemeSelector": true })
