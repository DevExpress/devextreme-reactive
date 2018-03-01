const PluginIndexerContext = {
  props: { position: {} },
  provide() {
    return {
      positionContext: this.position,
    };
  },
  render() {
    return this.$slots.default && this.$slots.default[0];
  },
};

export const PluginIndexer = {
  inject: {
    positionContext: {
      default: undefined,
    },
  },
  render() {
    const { positionContext } = this;

    return (
      <div>
        {
          this.$slots.default.map((child, index) => {
            if (!child.componentOptions) return child;

            const childPosition = () => {
              const calculatedPosition =
                (positionContext && positionContext()) || [];
              return [...calculatedPosition, index];
            };

            return (
              <PluginIndexerContext position={childPosition}>
                {child}
              </PluginIndexerContext>
            );
          })
        }
      </div>
    );
  },
};
