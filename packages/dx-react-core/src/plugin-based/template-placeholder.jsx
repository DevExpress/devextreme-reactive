import * as React from 'react';
import * as PropTypes from 'prop-types';
import { shallowEqual } from '@devexpress/dx-core';
import { PLUGIN_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT, TEMPLATE_HOST_CONTEXT } from './constants';

export class TemplatePlaceholder extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.subscription = {
      [RERENDER_TEMPLATE_EVENT]: (id) => {
        if (this.template && this.template.id === id) {
          this.forceUpdate();
        }
      },
    };
  }
  getChildContext() {
    return {
      [TEMPLATE_HOST_CONTEXT]: {
        templates: () => this.restTemplates,
        params: () => this.params,
      },
    };
  }
  componentWillMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.registerSubscription(this.subscription);
  }
  shouldComponentUpdate(nextProps) {
    const { params } = this.getRenderingData(nextProps);
    return !shallowEqual(params, this.params) || this.props.children !== nextProps.children;
  }
  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }
  getRenderingData(props) {
    const { name, params } = props;
    if (name) {
      const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
      return {
        params,
        templates: pluginHost.collect(`${name}Template`)
          .filter(template => template.predicate(params))
          .reverse(),
      };
    }
    const { [TEMPLATE_HOST_CONTEXT]: templateHost } = this.context;
    return {
      params: params || templateHost.params(),
      templates: templateHost.templates(),
    };
  }
  render() {
    const { params, templates } = this.getRenderingData(this.props);

    this.params = params;
    [this.template] = templates;
    this.restTemplates = templates.slice(1);

    let content = null;
    if (this.template) {
      const { children: templateContent } = this.template;

      content = templateContent() || null;
      if (content && typeof content === 'function') {
        content = content(params);
      }
    }

    const { children: templatePlaceholder } = this.props;
    return templatePlaceholder ? templatePlaceholder(content) : content;
  }
}

TemplatePlaceholder.propTypes = {
  name: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  params: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  children: PropTypes.func,
};

TemplatePlaceholder.defaultProps = {
  name: undefined,
  params: undefined,
  children: undefined,
};

TemplatePlaceholder.contextTypes = {
  [TEMPLATE_HOST_CONTEXT]: PropTypes.object,
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
};

TemplatePlaceholder.childContextTypes = {
  [TEMPLATE_HOST_CONTEXT]: PropTypes.object.isRequired,
};
