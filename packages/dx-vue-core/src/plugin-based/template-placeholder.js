import { PLUGIN_HOST_CONTEXT, TEMPLATE_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT } from './constants';

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
        : this.params;
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
    if (!template) return null;

    let content = template.children();
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
