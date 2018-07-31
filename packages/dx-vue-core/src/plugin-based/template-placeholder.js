import { PLUGIN_HOST_CONTEXT, TEMPLATE_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT } from './constants';

export const DxTemplatePlaceholder = {
  name: 'DxTemplatePlaceholder',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
    },
  },
  provide() {
    const templateHost = {};
    Object.defineProperty(templateHost, 'params', {
      enumerable: true,
      get: () => this.computedParams,
    });
    Object.defineProperty(templateHost, 'templates', {
      enumerable: true,
      get: () => this.computedTemplates.slice(1),
    });
    return { [TEMPLATE_HOST_CONTEXT]: templateHost };
  },
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
    templateHost: {
      from: TEMPLATE_HOST_CONTEXT,
      default: { templates: [], params: undefined },
    },
  },
  created() {
    this.subscription = {
      [RERENDER_TEMPLATE_EVENT]: (id) => {
        if (this.computedTemplates[0] && this.computedTemplates[0].id === id) {
          this.$forceUpdate();
        }
      },
    };
  },
  beforeMount() {
    this.pluginHost.registerSubscription(this.subscription);
  },
  computed: {
    computedParams() {
      const that = this;
      return !Object.keys(this.$attrs).length && !Object.keys(this.$listeners).length
        ? this.templateHost.params
        : {
          get attrs() { return that.$attrs; },
          get listeners() { return that.$listeners; },
          get slots() { return that.$slots; },
          get scopedSlots() { return that.$scopedSlots; },
        };
    },
    computedTemplates() {
      return this.name
        ? this.pluginHost.collect(`${this.name}Template`)
          .filter(template => template.predicate(this.computedParams))
          .reverse()
        : this.templateHost.templates;
    },
  },
  render() {
    const template = this.computedTemplates[0];

    let content = template ? template.children() : null;
    if (content && typeof content === 'function') {
      content = content(this.computedParams);
    }
    if (this.$scopedSlots.default) {
      content = this.$scopedSlots.default(content);
    }
    return content && content.length ? content[0] : content;
  },
  destroyed() {
    this.pluginHost.unregisterSubscription(this.subscription);
  },
};
