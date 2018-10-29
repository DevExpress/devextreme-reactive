# connectProps

A function that applies additional properties to a React component.

## Arguments

Name | Type | Description
-----|------|------------
WrappedComponent | ComponentType&lt;object&gt; | A React component that accepts properties.
getAdditionalProps | () => object | A function that returns component properties.

## Return Value

Type | Description
-----|------------
ComponentType&lt;object&gt; | A [higher-order component](https://reactjs.org/docs/higher-order-components.html) that renders a wrapped component with additional properties returned by the `getAdditionalProps` function. You can [force an update](https://reactjs.org/docs/react-component.html#forceupdate) of the wrapped component using its static  `update()` method. It calls the `getAdditionalProps` function before each update.
