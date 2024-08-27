# React Grid Integrated Data Shaping

<div class="alert-note">
      <div>
      <div class="note-start">NOTE</div>
            <div class="part-title">DevExtreme Reactive Components - Maintenance Support Mode</div>
            DevExtreme Reactive component libraries are in <a
               href="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md"
               target="_blank"
               rel="noopener noreferrer"
            >
              maintenance support mode
            </a>.
            No new features/capabilities will be added to DevExtreme Reactive component
            libraries in the future (end-of-life - December 2025).
          <p>
            <div class="part-title">Developing a React App? Check out our updated React UI Suite instead.</div>
            If you are considering React for an upcoming software project or
            have used DevExtreme Reactive components in the past, please visit&nbsp;
            <a
              href="https://js.devexpress.com/react/"
              target="_blank"
              rel="noopener noreferrer"
            >
              js.devexpress.com/react
            </a>
            &nbsp;and download a free trial version of DevExtreme React UI - over 70+ components
            designed to help you build your best, without limits or compromise.
          </p>
      </div>
    </div>

This demo shows how to use TypeScript to create a Grid with sorting, grouping, filtering, and paging in the [Uncontrolled mode](../../docs/guides/controlled-and-uncontrolled-modes.md). Use this mode if you do not need to share the Grid's state among other parts of your application.

If you use selection with integrated data shaping, the Select All checkbox's operation depends on the plugin order. In this demo, the `IntegratedSelection` plugin is linked after all the data shaping plugins. In this case, Select All affects only displayed rows.

.embedded-demo({ "path": "grid-featured-integrated-data-shaping/demo", "showThemeSelector": true, "showThemeVariants": true })
