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

## Getting started

Commonly these components should not be used in end-user codebase. They are suitable to create complex components, that can be designed as single component, but be used as partially, depending on user requirements. But in some cases it is required to enhance existed plugins based components.

The main ideas landed in pluggable component are: Redux-like architecture, immutable data structures, selectors.

### PluginHost

PluginHost is the container component for plugins. It provides basic communication between plugins. Any plugin should be plugged into PluginHost. It will throws otherwise.

Plugins inside are applied in defined by specific plugin order. So, it is required to ensure correct place for plugin.

### TemplatePlaceholder

Each pluggable component consists of any number of templates. TemplatePlaceholder defines the place where template with specified name and parameters is rendered.

### Template

It defines markup that should be represented. It allows to render content outside plugin root, but within PluginHost. Each template has name, by that it could be rendered inside TemplatePlaceholder.

Templates are rendered in chain. So if there are more than one templates with the same name, TemplatePlaceholder will render the last registered one. Templates can override each other or embed the next template in chain with TemplatePlaceholder component without any parameters `<TemplatePlaceholder />`.

There is one special template with name `root`. It is defined by PluginHost and renders nothing. It is required to override this template.

Template has possibility to reject rendering based on condition, defined in `predicate` property.

Template can define connection for Getters and Actions to share some functionality with other plugins. For that reasons there are `connectGetters` and `connectActions` properties.

### Getter

Defines a variable that is possible to override. It can be accessible by another Getter, Template or Watcher.

Getters implement reselect-like approach to cache and update data. Also, they represents data chains, where getter is based only on getters defined before it. In templates getters value is from the last defined getter in a chain.

Getter can provide value through defining `value` property, or a computed value, based on pure function and connected arguments (`pureComputed` and `connectArgs` properties).

### Actions

Defines an action that can be emitted from any other part of the pluggable component.

### Watcher

Defines a watch expression based on getters defined before a watcher. It is convenient place to react on internal getter change.
