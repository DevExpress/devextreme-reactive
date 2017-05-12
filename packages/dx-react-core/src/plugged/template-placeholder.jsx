import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '../utils/shallowEqual';
import { RERENDER_TEMPLATE } from './template';
import { TemplateConnector } from './template-connector';

export class TemplatePlaceholder extends React.PureComponent {
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
    this.teardownSubscription();
    this.prepareTemplates();

    if (!this.template) return null;

    this.setupSubscription();

    const { children: templateChildren, connectGetters, connectActions } = this.template;
    const { children } = this.props;

    const templateChildrenUnwrapped = children ? children(templateChildren()) : templateChildren();

    return (
      <TemplateConnector
        params={this.params}
        mapProps={connectGetters}
        mapActions={connectActions}
        content={templateChildrenUnwrapped}
      />
    );
  }
}
TemplatePlaceholder.defaultProps = {
  name: null,
  params: null,
  children: null,
};
TemplatePlaceholder.propTypes = {
  name: PropTypes.string,
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.func,
};
TemplatePlaceholder.childContextTypes = {
  templateHost: PropTypes.object.isRequired,
};
TemplatePlaceholder.contextTypes = {
  templateHost: PropTypes.object,
  pluginHost: PropTypes.object.isRequired,
};
