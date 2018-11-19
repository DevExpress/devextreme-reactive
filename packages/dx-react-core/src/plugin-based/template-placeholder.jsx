import * as React from 'react';
import * as PropTypes from 'prop-types';
import { shallowEqual } from '@devexpress/dx-core';
import {
  PLUGIN_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT,
  TEMPLATE_HOST_CONTEXT, RERENDER_TEMPLATE_SCOPE_EVENT,
} from './constants';
import { withContext } from '../utils/with-props-from-context';
import { PluginHostContext, TemplateHostContext } from './contexts';

export class TemplatePlaceholderBase extends React.Component {
  constructor(props) {
    super(props);
    const { name: propsName } = this.props;

    this.subscription = {
      [RERENDER_TEMPLATE_EVENT]: (id) => {
        if (this.template && this.template.id === id) {
          this.forceUpdate();
        }
      },
      [RERENDER_TEMPLATE_SCOPE_EVENT]: (name) => {
        if (propsName === name) {
          this.forceUpdate();
        }
      },
    };
  }

  componentDidMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.registerSubscription(this.subscription);
  }

  shouldComponentUpdate(nextProps) {
    const { params } = this.getRenderingData(nextProps);
    const { children } = this.props;
    return !shallowEqual(params, this.params) || children !== nextProps.children;
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.unregisterSubscription(this.subscription);
  }

  getRenderingData(props) {
    const { name, params } = props;
    if (name) {
      const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
      return {
        params,
        templates: pluginHost.collect(`${name}Template`)
          .filter(template => template.predicate(params))
          .reverse(),
      };
    }
    const { [TEMPLATE_HOST_CONTEXT]: templateHost } = this.props;
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
    return (
      <TemplateHostContext.Provider value={{
        templates: () => this.restTemplates,
        params: () => this.params,
      }}
      >
        {templatePlaceholder ? templatePlaceholder(content) : content}
      </TemplateHostContext.Provider>
    );
  }
}

TemplatePlaceholderBase.propTypes = {
  name: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  params: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  [TEMPLATE_HOST_CONTEXT]: PropTypes.object,
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  children: PropTypes.func,
};

TemplatePlaceholderBase.defaultProps = {
  [TEMPLATE_HOST_CONTEXT]: undefined,
  name: undefined,
  params: undefined,
  children: undefined,
};

export const TemplatePlaceholder = withContext(PluginHostContext, PLUGIN_HOST_CONTEXT)(
  withContext(TemplateHostContext, TEMPLATE_HOST_CONTEXT)(TemplatePlaceholderBase),
);
