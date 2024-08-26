# React Chart - Getting Started

<div class="alert-note">
      <div>
      <div class="note-start">NOTE</div>
          <p>
            <div class="part-title">Developing a React App? Check out our updated React UI Suite instead.</div>
            DevExtreme Reactive component libraries are in maintenance support mode.
            No new features/capabilities will be added to DevExtreme Reactive component
            libraries in the future (end-of-life - July 2025).
          </p>
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

## Overview

The DevExtreme React Chart is a data visualization component that provides different series types, including bar, line, area, scatter, pie, and so on. It can function in uncontrolled and controlled state modes. In uncontrolled mode, the UI plugins manage the state internally. In controlled mode, the state is managed externally via plugin props. The DevExtreme React Chart has a composable and extendable architecture in which plugins provide additional elements (such as a legend, grid, and axes). It also supports Twitter Bootstrap and Material-UI rendering and theming.

## Installation

Install the `dx-react-chart` package and its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core.npm-tag() @devexpress/dx-react-chart.npm-tag()
```

This package does not contain visual components. In the examples below, visual components are rendered using the Material-UI package. However, you can use any of the following:

- Material-UI

  ```
  npm i --save @devexpress/dx-react-chart-material-ui.npm-tag()
  ```

  Make sure that the [Material-UI](https://material-ui.com/) dependencies are installed and properly configured. Check the Material-UI's [Getting Started](https://material-ui.com/getting-started/installation) article for configuration details.

- Bootstrap 4

  ```
  npm i --save @devexpress/dx-react-chart-bootstrap4.npm-tag()
  ```

  Make sure that the [OpenIconic](https://useiconic.com/open) icons are installed and properly configured.

  Add the DevExtreme React Chart styles in the root .js file:

  ```js
  import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
  ```

  NOTE: The DevExtreme React Chart does not include Bootstrap CSS.

## Supported Browsers

React Chart supports the latest stable releases of all major browsers: Google Chrome, Mozilla Firefox, Safari, Opera, and Microsoft Edge.

React Chart can work in other browsers if they use the latest version of WebKit, Blink, or Gecko, whether directly or via the platform's web view API. Some of these browsers may require adding [polyfills](#polyfills). However, correct operation in such browsers, including Internet Explorer, is not guaranteed.

Because React Chart is built upon the [D3](https://d3js.org) library, the library's [browser support restrictions](https://github.com/d3/d3/wiki#supported-environments) apply to React Chart as well.

## Polyfills

React Chart uses the latest web platform standards and does not support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

## Use the Chart Component

The Chart component's functionality is implemented in plugins. To draw a simple chart, use the `ArgumentAxis` and `ValueAxis` plugins and one of the [series](series.md) plugins. The following code shows how to configure a simple line chart:

.embedded-demo({ "path": "chart-basic/getting-started", "showThemeSelector": true })

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/)
