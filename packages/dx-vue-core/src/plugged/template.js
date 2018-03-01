export const RERENDER_TEMPLATE = 'rerenderTemplate';
let globalTemplateId = 0;
export const Template = {
  props: {
    name: {},
    predicate: {},
  },
  beforeCreate() {
    globalTemplateId += 1;
    this.id = globalTemplateId;
  },
  inject: ['pluginHost', 'positionContext'],
  created() {
    this.plugin = {
      position: () => [0],
      [`${this.name}Template`]: {
        id: this.id,
        predicate: params => (this.predicate ? this.predicate(params) : true),
        children: () => this.$scopedSlots.default || this.$slots.default,
      },
    };
  },
  beforeMount() {
    this.pluginHost.registerPlugin(this.plugin);
  },
  render() {
    return null;
  },
  updated() {
    this.pluginHost.broadcast(RERENDER_TEMPLATE, this.id);
  },
  destroyed() {
    this.pluginHost.unregisterPlugin(this.plugin);
  },
};
