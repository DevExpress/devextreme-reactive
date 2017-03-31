# DevExtreme React Core

Component suite to build complex pluggable components in React.

## Installation

Install package:

```
npm i @devexpress/dx-react-core --save
```

Add to your project:

```js
import { PluginHost, ... } from '@devexpress/dx-react-core'

export const PluggableComponent = ({ children }) => (
  <PluginHost>
    {children}
  </PluginHost>
);
```
