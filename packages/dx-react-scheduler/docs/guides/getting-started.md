# React Scheduler - Getting Started

Project status: **CTP**

## Overview

DevExtreme React Scheduler is a component that represents scheduled data and allows a user to manage it. Scheduler can display data on different views: day, week, and month. Support for controlled and uncontrolled state modes allows you to manage Scheduler state manually or using a state management library like Redux. The DevExtreme Scheduler component has a composable and extendable plugin-based architecture. Currently, the Scheduler is provided with Material-UI rendering and theming.

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

```jsx
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';

const App = () => (
  <Scheduler
    data={[
      { startDate: '2018-10-31 10:00', endDate: '2018-10-31 11:00', title: 'Meeting' },
      { startDate: '2018-11-01 18:00', endDate: '2018-11-01 19:30', title: 'Go to a gym' },
    ]}
  >
    <DayView />
    <Appointments />
  </Scheduler>
);
```

## Try Out the React Scheduler

Follow the link below to try out the React Scheduler:

- [CodeSandbox for Material-UI](https://codesandbox.io/s/0y4zvoxl8v)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
