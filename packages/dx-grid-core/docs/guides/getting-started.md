# {{library}} Grid - Getting Started

## Overview

DevExtreme {{library}} Grid is a component that displays table data from a local or remote source. It supports paging, sorting, filtering, grouping and other data shaping options, row selection, and data editing. {{>overview}}

## Installation

{{>installation}}

## Supported Browsers

{{library}} Grid supports the latest stable releases of all major browsers: Google Chrome, Mozilla Firefox, Safari, Opera, and Microsoft Edge.

{{library}} Grid can work in other browsers if they use the latest version of WebKit, Blink, or Gecko, whether directly or via the platform's web view API. Some of these browsers may require adding [polyfills](#polyfills). However, such browsers, including Internet Explorer, may not work correctly.

## Polyfills

{{library}} Grid uses the latest web platform standards, and cannot support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

## Using Grid component

The Grid renders nothing by default. The root Grid component's nested plugin components implement its functionality, and it is necessary to specify at least one plugin that visualizes the grid data.

Use the Table plugin to display the data as a simple table:

{{>code}}

## Try Out The {{library}} Grid

Follow the links below to try out the {{library}} Grid:

{{>sandboxes}}

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
