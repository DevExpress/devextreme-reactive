export const TemplatePlaceholder = {
  props: {
    name: {},
    params: {},
  },
  inject: ['pluginHost'],
  render(h) {
    let content = this.pluginHost.collect(`${this.name}Template`)
      .reverse()[0].children();
    if (content && typeof content === 'function') {
      content = content(this.params);
    }
    return h('span', content);
  },
};
