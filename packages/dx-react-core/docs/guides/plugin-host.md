# React Core - PluginHost

## What is Plugin

Plugin is a common React Component that have a certain structure.
First, the root element of any plugin should be represented by [PluginContainer](../reference/plugin-container.md). PluginContainer containes plugin primitives.
Plugin primitive is React Component that doesn't have any UI elements. It just defines how a plugin can communicate with other ones.

There are three plugin primitives:

- [Getter](../reference/getter.md)
- [Action](../reference/action.md)
- [Template](../reference/template.md)

The simple plugin structure can look as follows:

```js
class MyPlugin extends React.PureComponent {
  render() {
    return (
      <PluginContainer>
        <Template name="a" />
        <Template name="b" />
        <Action name="c" />
        <Getter name="d" />
      </PluginContainer>
    );
  }
}
```

Plugin can render UI or implement some logic without visualization. As pointed above, different plugins can communicate with each other inside one [PluginHost](../reference/plugin-host.md).

## PluginHost

[PluginHost](../reference/plugin-host.md) is React Component that allows to organize nested components and use them together.
If PluginHost renresents the root element of React component, this component can be called as Pluggable React Component.

Actually, PluginHost implements the [Inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) design principle.

To make it clear, Pluggable React Component can be considered as two particular parts: Plugin Root and Rendering Root.

// Add image or demo

Plugin Root contains plugins and their primitives. It doesn't render UI.

Rendering Root is a visual part of PluginHost rendered by using visual plugin primitives.
Visual plugin primitive is React component that uses data provided by plugin primitives to render UI elements.

Visual plugin primitives contain the following ones:

- [TemplatePlaceholder](../reference/template-placeholder.md)
- [TemplateConnector](../reference/template-connector.md)
