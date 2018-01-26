# React Core - Fundamentals

React Core provides a set of React components that allows implementing plugin based component.

## Core Principles

Plugin based component is designed with the following patterns in mind:

- **[Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control){:target="_blank"}**. Plugins located in an IoC container. They can consume and provide items for the container.
- **[State Managment](https://en.wikipedia.org/wiki/State_management){:target="_blank"}**. It allows defining component's state and a way how it mutates.
- **[Data Piping](https://en.wikipedia.org/wiki/Pipeline_(computing)){:target="_blank"}**. It clarifies a way that plugins communicate.

Each pluggin based component consists of the following parts:

- Plugin Host React component. It hosts pligins.
- Plugin React component. It defines markup and manages state part that it owns with a help of actions modifying it.

Plugins can communicate with each other. The communication principle is based on the plugin's position. For example, several plugins may contain markup to be placed in the root. The last defined markup (in the last placed plugin) will be rendered first and so on.

The state of plugin based component is constructed by the state parts defined by contained plugins. They are intended to hold [normalized data](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html){:target="_blank"} and immutable. The only one way to mutate the state is an action execution.

## Plugin Host Component

[PluginHost](../reference/plugin-host.md) is an auxilary React component that provides mechanisms that enables all the listed abilities. It hosts plugins as child React components in order to provide a single communication point for them. If PluginHost represents the root element of React component, the component can be called as plugin host component.

.embedded-demo({ "path": "core-basic/plugin-host-component", "defaultTab": "source" })

The children of PluginHost component is called **plugin root**. It should contain only plugin primitives and plugin components within. **Plugin primitives** are a subset of React Core components that should be placed inside PluginHost and plugins.

Here the list of plugin primitives:

- [Template](../reference/template.md). Defines markup.
- [Getter](../reference/getter.md). Defines a value.
- [Action](../reference/action.md). Definea an action.

Plugin primitives are initialized when plugin host component is mounting. After this the result React component tree is starting rendering and appears in rendering root. **Rendering root** is a plugin host component markup constructed by vizualization primitives and React components. **Vizualization primitives** are a subset of React Core components that links state with actions and mount calculated component tree.

Here the list of vizualization primitives:

- [TemplatePlaceholder](../reference/template-placeholder.md). Renders markup defined by the Template.
- [TemplateConnector](../reference/template-connector.md). Connects values and actions defined by the Getter and Action.

## Plugin Component

[Plugin](../reference/plugin.md) is an auxilary React component created to hold several plugin primitives or plugins within. If Plugin represents the root element of React component, the component can be called as plugin component.

.embedded-demo({ "path": "core-basic/plugin-component", "defaultTab": "source" })

It should contain only plugin primitives and plugin components within.
