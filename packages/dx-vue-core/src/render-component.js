export const createRenderComponent = (Component, initialAdditionalProps) => {
  let storedAdditionalProps = initialAdditionalProps;
  const components = new Set();

  const RenderComponent = {
    name: 'RenderComponent',
    inheritAttrs: false,
    beforeMount() {
      components.add(this);
    },
    beforeDestroy() {
      components.delete(this);
    },
    render() {
      return (
        <Component
          {...{ attrs: { ...this.$attrs, ...storedAdditionalProps }, on: { ...this.$listeners } }}
        />
      );
    },
  };

  return {
    component: RenderComponent,
    update: (additionalProps) => {
      storedAdditionalProps = additionalProps;
      Array.from(components.values())
        .forEach(component => component.$forceUpdate());
    },
  };
};
