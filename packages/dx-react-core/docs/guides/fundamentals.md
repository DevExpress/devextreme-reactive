# React Core - Fundamentals

React Core provides components for creating a plugin-based component.

## Core Principles

A plugin-based component should adhere to the following principles:

##### [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control){:target="_blank"}
 
A plugin shares its items (Getters, Actions, Templates) within an IoC (Inversion of Control) container and can use the ones other plugins share.
 
A plugin based component consists of the following child components:

- Plugin Host component  
 A component that hosts plugins.

- Plugin components  
 Each plugin is a React component that defines markup, stores a state and provides actions for state modification.

##### [State Managment](https://en.wikipedia.org/wiki/State_management){:target="_blank"}

The component provides means for state storing and mutation.

The plugin based component's state is an aggregation of plugin states, which keep data [normalized](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) and immutable. The state can only be mutated through an action execution.

##### [Data Piping](https://en.wikipedia.org/wiki/Pipeline_(computing)){:target="_blank"}

The component provides a mechanism for plugins communication.
 
The plugin application order depends on the order the plugins are defined in the parent component. The higher plugin is defined, the earlier it is applied.

### Plugin Host Component

[PluginHost](../reference/plugin-host.md) is an auxiliary component used as a single communication point for all plugins that provide adhering to the principles listed above. If a React component contains PluginHost in the root, it is called plugin host component.

.embedded-demo({ "path": "core-basic/plugin-host-component", "defaultTab": "source" })

The PluginHost component's content is called **plugin root**. It should contain only **plugin primitives** and plugin components.

**Plugin primitives** are React Core components that can be declared within a plugin based component or a plugin. They are initialized when the plugin host is being mounted. The following plugin primitives are available:

- [Template](../reference/template.md). Defines markup.
- [Getter](../reference/getter.md). Defines a value.
- [Action](../reference/action.md). Defines an action.

When the plugin host has been mounted, a component tree is rendered within the PluginHost component's markup called **rendering root**. The rendering root contains vizualization primitives and React components. **Visualization primitives** are React Core components that define relations between state and actions and mount the rendered component tree.

Visualization primitives:

- [TemplatePlaceholder](../reference/template-placeholder.md). Renders markup defined by the Template.
- [TemplateConnector](../reference/template-connector.md). Connects values and actions defined by the Getter and Action.

### Plugin Component

[Plugin](../reference/plugin.md) is an auxiliary component that holds plugin primitives or nested plugins. If a React component's root element is a plugin, this component is called plugin component.

.embedded-demo({ "path": "core-basic/plugin-component", "defaultTab": "source" })
