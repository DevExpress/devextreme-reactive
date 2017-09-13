import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '@devexpress/dx-core';
import { RERENDER_TEMPLATE } from './template';

export class TemplatePlaceholder extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.subscription = {
      [RERENDER_TEMPLATE]: (id) => {
        if (this.template && this.template.id === id) {
          this.forceUpdate();
        }
      },
    };
  }
  getChildContext() {
    return {
      templateHost: {
        templates: () => this.restTemplates,
        params: () => this.params,
      },
    };
  }
  componentWillMount() {
    const { pluginHost } = this.context;
    pluginHost.registerSubscription(this.subscription);
  }
  shouldComponentUpdate(nextProps) {
    const { params } = this.getRenderingData(nextProps);
    return !shallowEqual(params, this.params);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;
    pluginHost.unregisterSubscription(this.subscription);
  }
  getRenderingData(props) {
    const { name, params } = props;
    if (name) {
      const { pluginHost } = this.context;
      return {
        params,
        templates: pluginHost.collect(`${name}Template`)
          .filter(template => template.predicate(params))
          .reverse(),
      };
    }
    const { templateHost } = this.context;
    return {
      params: params || templateHost.params(),
      templates: templateHost.templates(),
    };
  }
  render() {
    const { params, templates } = this.getRenderingData(this.props);

    this.params = params;
    this.template = templates[0];
    this.restTemplates = templates.slice(1);

    let content = null;
    if (this.template) {
      const { children: templateContent } = this.template;

      content = templateContent();
      if (content && content instanceof Function) {
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
  templateHost: PropTypes.object,
  pluginHost: PropTypes.object.isRequired,
};

TemplatePlaceholder.childContextTypes = {
  templateHost: PropTypes.object.isRequired,
};
