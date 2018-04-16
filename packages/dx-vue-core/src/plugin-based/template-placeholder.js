import { PLUGIN_HOST_CONTEXT, TEMPLATE_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT } from './constants';

const SLOTS_SYMBOL = Symbol('slots');

export const TemplatePlaceholder = {
  name: 'TemplatePlaceholder',
  props: {
    name: {
      type: String,
    },
    params: {
      type: Object,
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
    Object.defineProperty(templateHost, 'slots', {
      enumerable: true,
      get: () => this.$slots,
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
      return this.params === undefined
        ? this.templateHost.params
        : { ...this.params, [SLOTS_SYMBOL]: this.$slots };
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

export const TemplatePlaceholderSlot = {
  name: 'TemplatePlaceholderSlot',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default',
    },
    params: {
      type: Object,
    },
  },
  render(h, { props }) {
    return props.params[SLOTS_SYMBOL][props.name];
  },
};
