# PluginHost

## What is Plugin

Plugin is React Component that have a certain structure.
First, the root element of any plugin should be represented by [PluginContainer](../reference/plugin-container.md). PluginContainer containes plugin primitives:

- [Getter](../reference/getter.md)
- [Action](../reference/action.md)
- [Template](../reference/template.md)

```js
class MyPlugin extends React.PureComponent {
  render() {
    return () {
      <PluginContainer>
        <Template name="a" />
        <Template name="b" />
        <Action name="c" />
        <Getter name="d" />
      </PluginContainer>
    }
  }
}
```

Plugin can render UI or implement some logic without visualization. Different plugins can communicate with each other inside one PluginHost.
