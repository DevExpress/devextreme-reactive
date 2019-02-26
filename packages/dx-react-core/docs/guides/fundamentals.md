# React Core - Fundamentals

React Core provides components for creating a plugin-based component.

## Core Principles

A plugin-based component should adhere to the following principles:

### [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control){:target="_blank"}

A plugin shares its items (Getters, Actions, Templates) within an IoC (Inversion of Control) container and can use the ones other plugins share.

A plugin based component consists of the following child components:

- **Plugin Host component**. A component that hosts plugins.

- **Plugin components**. Each plugin is a React component that defines a markup, stores a state and provides state modification actions.

### [State Management](https://en.wikipedia.org/wiki/State_management){:target="_blank"}

The component provides the means for state storing and mutation.

The plugin based component's state is an aggregation of plugin states which keep data [normalized](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) and immutable. The state can only be changed through executing an action.

### [Data Piping](https://en.wikipedia.org/wiki/Pipeline_(computing)){:target="_blank"}

The component provides a mechanism for communication between plugins.

The plugin application order depends on plugins' defined order in the parent component. The higher it is, the earlier it is applied.

## PluginHost Component

A [PluginHost](../reference/plugin-host.md) is an auxiliary component used as a single communication point for all plugins and adheres to the principles listed above. If a React component contains a PluginHost in the root, it is called a plugin host component.

.embedded-demo({ "path": "core-basic/plugin-host-component", "defaultTab": "source" })

The PluginHost component's content is called **plugin root**. It must contain only **plugin primitives** and plugin components.

**Plugin primitives** are React Core components that can be declared within a plugin based component or plugin. They are initialized when the plugin host is being mounted. The following plugin primitives are available:

- [Template](../reference/template.md). Defines a markup.
- [Getter](../reference/getter.md). Defines a value.
- [Action](../reference/action.md). Defines an action.

When the plugin host has been mounted, a component tree is rendered within the PluginHost component's markup (**rendering root**). The rendering root contains visualization primitives and React components. **Visualization primitives** are React Core components that mount the rendered component tree and define relations between states and actions.

Visualization primitives:

- [TemplatePlaceholder](../reference/template-placeholder.md). Renders a markup the Template defines.
- [TemplateConnector](../reference/template-connector.md). Connects values and actions the Getter and Action define.

## Plugin Component

A [Plugin](../reference/plugin.md) is an auxiliary component that stores plugin primitives or nested plugins. If a React component's root element is a plugin, this component is a plugin component.

.embedded-demo({ "path": "core-basic/plugin-component", "defaultTab": "source" })
