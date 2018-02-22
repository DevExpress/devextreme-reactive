import { RERENDER_TEMPLATE } from './template';

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
      },
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
    templateHost: { default: null },
  },
  created() {
    this.subscription = {
      [RERENDER_TEMPLATE]: () => {
        // if (this.template && this.template.id === id) {
        this.$forceUpdate();
      },
    };
  },
  beforeMount() {
    this.pluginHost.registerSubscription(this.subscription);
  },
  render() {
    const params = this.params === 'undefined' ? this.templateHost.params : this.params;
    const templates = this.name
      ? this.pluginHost.collect(`${this.name}Template`)
        .filter(template => template.predicate(params))
        .reverse()
      : this.templateHost.restTemplates;
    const restTemplates = templates.slice(1);

    const template = templates[0];
    if (!template) return null;

    let content = template.children();
    if (content && typeof content === 'function') {
      content = content(this.params);
    }
    // console.log(content[0].children[0].text);
    return (
      <TemplatePlaceholderContext
        restTemplates={restTemplates}
        params={params}
      >
        {content}
      </TemplatePlaceholderContext>
    );
  },
  destroyed() {
    this.pluginHost.unregisterSubscription(this.subscription);
  },
};
