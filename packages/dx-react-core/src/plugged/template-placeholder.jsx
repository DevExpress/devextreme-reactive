import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '@devexpress/dx-core';
import { RERENDER_TEMPLATE } from './template';
import { TemplateConnectorEmbedded } from './template-connector-embedded';

export class TemplatePlaceholder extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.subscription = {
      [RERENDER_TEMPLATE]: (id) => {
        if (this.template.id === id) { this.forceUpdate(); }
      },
    };
  }
  getChildContext() {
    return {
      templateHost: {
        templates: this.restTemplates,
        params: this.params,
      },
    };
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props.params, nextProps.params);
  }
  componentWillUnmount() {
    this.teardownSubscription();
  }
  setupSubscription() {
    const { pluginHost } = this.context;
    pluginHost.registerSubscription(this.subscription);
  }
  teardownSubscription() {
    const { pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }
  prepareTemplates() {
    const { pluginHost, templateHost } = this.context;
    const { name, params } = this.props;

    this.params = params;
    if (!name && this.context.templateHost) this.params = this.context.templateHost.params;

    const templates = name
      ? pluginHost.collect(`${name}Template`)
        .filter(template => (template.predicate ? template.predicate(params) : true))
        .reverse()
      : templateHost.templates;

    this.template = templates[0];
    this.restTemplates = templates.slice(1);
  }
  render() {
    const { children: placeholder } = this.props;

    this.teardownSubscription();
    this.prepareTemplates();

    if (!this.template) return placeholder(null);

    this.setupSubscription();

    const { children: template, connectGetters, connectActions } = this.template;

    let content = template();
    if (content) {
      if (connectGetters || connectActions) {
        content = (
          <TemplateConnectorEmbedded
            params={this.params}
            mapProps={connectGetters}
            mapActions={connectActions}
            content={content}
          />
        );
      } else if (content instanceof Function) {
        content = content(this.params);
      }
    }

    return placeholder ? placeholder(content) : content;
  }
}

TemplatePlaceholder.propTypes = {
  name: PropTypes.string,
  params: PropTypes.object,
  children: PropTypes.func,
};

TemplatePlaceholder.defaultProps = {
  name: undefined,
  params: undefined,
  children: undefined,
};

TemplatePlaceholder.contextTypes = {
  templateHost: PropTypes.object,
  pluginHost: PropTypes.object.isRequired,
};

TemplatePlaceholder.childContextTypes = {
  templateHost: PropTypes.object.isRequired,
};
