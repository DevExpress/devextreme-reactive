# React Core - Fundamentals

React Core provides components that allow the creation of a plugin based component.

## Core Principles

A plugin based component should adhere to the following principles:

##### [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control){:target="_blank"}
 
Plugins are located in an IoC container and can provide their items for the container or consume container's ones.
 
A plugin based component consists of the following child components:

- Plugin Host component  
 A component that hosts plugins.

- Plugin components  
 Each plugin is a React component that defines markup, stores a state and provides actions for state modification.

##### [State Managment](https://en.wikipedia.org/wiki/State_management){:target="_blank"}

The component provides means for state storing and mutation.

The plugin based component's state is an arrgeration of plugin states, which keep data [normalized](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) and immutable. The state can only be mutated through an action execution.

##### [Data Piping](https://en.wikipedia.org/wiki/Pipeline_(computing)){:target="_blank"}

The component provides a mechanism for plugins communication.
 
The plugin application order depends on the order the plugins are defined in the parent component. The higher plugin is defined, the earlier it is applied.

### Plugin Host Component

[PluginHost](../reference/plugin-host.md) is an auxiliary component used as a single communication point for all plugins that provides adhering to the principles listed above. If a React component contains PluginHost in the root, it is called plugin host component.

.embedded-demo({ "path": "core-basic/plugin-host-component", "defaultTab": "source" })

The PluginHost component's content is called **plugin root**. It should contain only **plugin primitives** and plugin components.

**Plugin primitives** are React Core components that can be declared within a plugin based component or a plugin. They are initialized when the plugin host is being mounted. The following plugin primitives are available:

- [Template](../reference/template.md). Defines markup.
- [Getter](../reference/getter.md). Defines a value.
- [Action](../reference/action.md). Definea an action.

When the plugin host has been mounted, a component tree is rendered within the PluginHost component's markup called **rendering root**. The rendering root contains vizualization primitives and React components. **Vizualization primitives** are React Core components that define relations between state and actions and mount the rendered component tree.

Vizualization primitives:

- [TemplatePlaceholder](../reference/template-placeholder.md). Renders markup defined by the Template.
- [TemplateConnector](../reference/template-connector.md). Connects values and actions defined by the Getter and Action.

### Plugin Component

[Plugin](../reference/plugin.md) is an auxiliary component that holds plugin primitives or nested plugins. If a React component's root element is a plugin, this component is called plugin component.

.embedded-demo({ "path": "core-basic/plugin-component", "defaultTab": "source" })
