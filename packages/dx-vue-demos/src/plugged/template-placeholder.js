const TemplatePlaceholderContext = {
  props: {
    restTemplates: {},
    params: {},
  },
  provide() {
    return {
      templateHost: {
        restTemplates: this.restTemplates,
        params: this.params,
      }
    };
  },
  render() {
    return this.$slots.default[0];
  },
};

export const TemplatePlaceholder = {
  props: {
    name: {},
    params: {},
  },
  inject: {
    pluginHost: 'pluginHost',
    templateHost: { default: null }
  },
  render(h) {
    const templates = this.name
      ? this.pluginHost.collect(`${this.name}Template`).reverse()
      : this.templateHost.restTemplates;
    const params = this.params === 'undefined' ? this.templateHost.params : this.params;
    const restTemplates = templates.slice(1);

    let content = templates[0].children();
    if (content && typeof content === 'function') {
      content = content(this.params);
    }
    return h(TemplatePlaceholderContext, { props: { restTemplates, params } }, content);
  },
};
