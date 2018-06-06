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

The `DxTableBandHeader` plugin allows you to customize the band header's appearance. The following example demonstrates how to use the `cellComponent` and add icons to band cells:

.embedded-demo({ "path": "grid-band-columns/customization", "showThemeSelector": true })
