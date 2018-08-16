# React Grid Integrated Data Shaping

This demo shows how to use TypeScript to create a Grid with sorting, grouping, filtering, and paging in the [Uncontrolled mode](../../docs/guides/controlled-and-uncontrolled-modes.md). Use this mode if you do not need to share the Grid's state among other parts of your application.

If you use selection with integrated data shaping, the Select All checkbox's operation depends on the plugin order. In this demo, the `IntegratedSelection` plugin is linked after all the data shaping plugins. In this case, Select All affects only displayed rows.

.embedded-demo({ "path": "grid-featured-integrated-data-shaping/demo", "showThemeSelector": true, "showThemeVariants": true })
