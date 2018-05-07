import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT, RERENDER_TEMPLATE_EVENT } from './constants';

let globalTemplateId = 0;
export const DxTemplate = {
  name: 'DxTemplate',
  props: {
    name: {
      type: String,
      required: true,
    },
    predicate: {
      type: Function,
    },
  },
  beforeCreate() {
    globalTemplateId += 1;
    this.id = globalTemplateId;
  },
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
    position: { from: POSITION_CONTEXT },
  },
  created() {
    this.plugin = {
      position: () => this.position(),
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
    this.pluginHost.broadcast(RERENDER_TEMPLATE_EVENT, this.id);
  },
  destroyed() {
    this.pluginHost.unregisterPlugin(this.plugin);
  },
};
