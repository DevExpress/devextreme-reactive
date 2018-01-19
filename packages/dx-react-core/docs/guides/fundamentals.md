# React Core - Fundamentals

React Core provides a set of React components that allows to implement pluggable React component.

## Pluggable React Component

Pluggable React component is a component that transforms special React components (plugins) into the complex React component hierarchy. It also provides an ability to communicate between plugins.

Pluggable React component aggregates two core principles:

- **[Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)**. It transforms linearly component structure defined by plugins into rich React component tree. It allows to define points in markup that can be extended by other plugins.
- **[State Managment](https://en.wikipedia.org/wiki/State_management)**. It provides a basic communication between plugins. It allows to define values and actions that can be consumed and executed by other plugins.

[PluginHost](../reference/plugin-host.md) is a React component that provides mechanisms that enables all of the listed abilities. If PluginHost renresents the root element of React component, the component can be called as pluggable React component.

.embedded-demo({ "path": "core-basic/pluggable-component" })

It should contain only plugin primitives and plugin React components within. **Plugin primitives** are a subset of React Core components that should be placed inside PluginHost and plugins. They also renders nothing. The content of PluginHost component is called **plugin root**.

Here the list of plugin primitives:

- [Template](../reference/template.md)
- [Getter](../reference/getter.md)
- [Action](../reference/action.md)

Plugin primitives are initialized when pluggable React component is mounting. After this the result React component tree is starting rendering and appears in rendering root. **Rendering root** is a pluggable React component markup constructed by vizualization primitives and normal React components. **Vizualization primitives** are a subset of React Core component that links state with actions and mount calculated component tree.

Here the list of vizualization primitives:

- [TemplatePlaceholder](../reference/template-placeholder.md)
- [TemplateConnector](../reference/template-connector.md)

## Plugin React Component

Plugin React component is a component that holds part of the pluggable React component logic.

[PluginContainer](../reference/plugin-container.md) is an auxilary React component created to hold several plugin primitives or plugins within. If PluginContainer renresents the root element of React component, the component can be called as plugin React component.

.embedded-demo({ "path": "core-basic/plugin-component" })

It should contain only plugin primitives and plugin React components within.
