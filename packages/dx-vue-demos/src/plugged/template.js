export const Template = {
  props: {
    name: {},
  },
  inject: ['pluginHost'],
  created() {
    this.plugin = {
      position: () => [0],
      [`${this.name}Template`]: {
        children: () => this.$scopedSlots.default || this.$slots.default,
      },
    };
  },
  beforeMount() {
    this.pluginHost.registerPlugin(this.plugin);
  },
  render(h) {
    return null;
  },
  destroyed() {
    this.pluginHost.unregisterPlugin(this.plugin);
  }
};
