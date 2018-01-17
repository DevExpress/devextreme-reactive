# React Core - Fundamentals

React Core provides a set of React components that allows to implement pluggable React component.

## Pluggable React Component

Pluggable React component is a component that transforms special React components (plugins) into the complex React component hierarchy. It also provides an ability to communicate between plugins.

Pluggable React component aggregates two core principles:

- **Inversion of Control**. It transforms linearly component structure defined by plugins into rich React component tree. It allows to define points in markup that can be extended by other plugins.
- **State Managment**. It provides a basic communication between plugins. It allows to define values and actions that can be consumed and executed by other plugins.

[PluginHost](../reference/plugin-host.md) is a React component that provides mechanisms that enables all of the listed abilities.

// demo with host

It renders nothing. It should contain only plugin primitives and plugin React components within. **Plugin primitives** are a subset of React Core components that should be placed inside PluginHost and plugins. They also renders nothing. The content of PluginHost component is called **plugin root**.

Plugin primitives are initialized when pluggable React component is mounting. After this the result React component tree is starting rendering by plugin primitives and appears in rendering root. **Rendering root** is a result pluggable React component markup constructed by visualisation primitives. **Visualisation primitives** are a subset of React Core component that links state with actions and mount calculated component tree.

## Plugin React Component

Plugin React component is a component that holds part of the pluggable React component logic.
