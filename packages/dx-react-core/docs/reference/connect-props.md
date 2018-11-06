# connectProps

A function that creates a new component that allows you to pass additional properties to the wrapped component.

## User reference

### Arguments

Name | Type | Description
-----|------|------------
WrappedComponent | ComponentType&lt;any&gt; | The react component to wrap.
getAdditionalProps | () => object | A function that returns properties to pass.

### Return Value

Type | Description
-----|------------
ComponentType&lt;any&gt; | A [higher-order component](https://reactjs.org/docs/higher-order-components.html) that passes additional properties to the wrapped component and renders it. Call the wrapped component's `update()` static method to [update the properties and rerender the component](https://reactjs.org/docs/react-component.html#forceupdate).
