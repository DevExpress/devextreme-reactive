# React Scheduler - Getting Started

<div class="alert-note">
      <div>
      <div class="note-start">NOTE</div>
          <p>
            <div class="part-title">DevExtreme Reactive Components - Maintenance Support Mode</div>
            DevExtreme Reactive component libraries are in <a
               href="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md"
               target="_blank"
               rel="noopener noreferrer"
            >
              maintenance support mode
            </a>.
            No new features/capabilities will be added to DevExtreme Reactive component
            libraries in the future (end-of-life: December 2025).
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

DevExtreme React Scheduler is a component that represents scheduled data and allows a user to manage it. Scheduler can display data on different views: day, week, and month. Support for controlled and uncontrolled state modes allows you to manage Scheduler state manually or using a state management library like Redux. The DevExtreme Scheduler component has a composable and extendable plugin-based architecture. Currently, the Scheduler is provided with Material-UI rendering and theming.

<iframe width="100%" height="476" src="https://www.youtube.com/embed/YPNeFdHvbbU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="border: 0;"></iframe>

## Installation

Install the dx-react-scheduler package and its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core.npm-tag() @devexpress/dx-react-scheduler.npm-tag()
```

This package does not contain visual components. In the examples below, visual components are rendered using the Material-UI package.

- Material-UI

  ```
  npm i --save @devexpress/dx-react-scheduler-material-ui.npm-tag()
  ```

  Make sure that the [Material-UI](https://material-ui.com/) dependencies are installed and properly configured. Check the Material-UI's [Getting Started](https://material-ui.com/getting-started/installation) article for configuration details.


## Supported Browsers

React Scheduler supports the latest stable releases of all major browsers: Google Chrome, Mozilla Firefox, Safari, Opera, and Microsoft Edge.

React Scheduler can work in other browsers if they use the latest version of WebKit, Blink, or Gecko, whether directly or via the platform's web view API. Some of these browsers may require adding [polyfills](#polyfills). However, such browsers, including Internet Explorer, may not work correctly.

## Polyfills

React Scheduler uses the latest web platform standards, and cannot support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

## Use the Scheduler Component

The Scheduler requires a view plugin and the `Appointments` plugin to display the specified data:

.embedded-demo({ "path": "scheduler-basic/basic-setup", "showThemeSelector": true })

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
