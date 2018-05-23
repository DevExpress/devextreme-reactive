# React Chart - Getting Started

## Overview

The DevExtreme React Chart is a component that visualizes data using a variety of series types, including bar, line, area, scatter, pie, and more. It is a stateless component - it relies on properties and works in controlled mode only. The DevExtreme React Chart has a composable and extendable architecture in which plugins provide additional elements (such as axes, legend, grid). Twitter Bootstrap and Material UI rendering and theming are supported out of the box.

## Installation

Install the dx-react-chart package and its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core.npm-tag() @devexpress/dx-react-chart.npm-tag()
```

This package does not contain visual components. In the examples below, visual components are rendered using the Material UI package. However, you can use any of the following:

- Material UI

  ```
  npm i --save @devexpress/dx-react-chart-material-ui.npm-tag()
  ```

  Make sure that the [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependencies are installed and properly configured. Check the Material UI's [Getting Started](https://material-ui-1dab0.firebaseapp.com/getting-started/installation) article for configuration details.

- Bootstrap 4

  ```
  npm i --save @devexpress/dx-react-chart-bootstrap4.npm-tag()
  ```

  Make sure that [reactstrap](https://reactstrap.github.io/) dependencies are installed and properly configured. Check the reactstrap's [Getting Started](https://reactstrap.github.io/) article for configuration details. You also need the [OpenIconic](https://useiconic.com/open) icons in your project.

  Add the DevExtreme React Chart styles in the root .js file:

  ```js
  import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
  ```

  NOTE: The DevExtreme React Chart does not include Bootstrap CSS.

## Supported Browsers

React Chart supports the latest stable releases of all major browsers: Google Chrome, Mozilla Firefox, Safari, Opera, and Microsoft Edge.

React Chart can work in other browsers if they use the latest version of WebKit, Blink, or Gecko, whether directly or via the platform's web view API. Some of these browsers may require adding [polyfills](#polyfills). However, correct operation in such browsers, including Internet Explorer, is not guaranteed.

## Polyfills

React Chart uses the latest web platform standards and does not support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

## Using the Chart Component

The Chart component renders nothing by default; plugins implement all its functionality. To create a simple chart, add one of the [`*Series` plugins](series.md) (for example, `LineSeries`) to draw a series and the `ArgumentAxis` and `ValueAxis` plugins to add the axes:

```jsx
import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
// import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-bootstrap4";

const App = () => (
  <Chart
      data={[
        { argument: 1, value: 10 },
        { argument: 2, value: 20 },
        { argument: 3, value: 30 }
      ]}
      width={400}
      height={200}
    >
      <ArgumentAxis name="argumentAxis" />
      <ValueAxis />
      <LineSeries valueField="value" argumentField="argument" />
    </Chart>
);

```

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/)
