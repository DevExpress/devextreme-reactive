import * as React from 'react';
import { shallowEqual } from '@devexpress/dx-core';
import {
  PLUGIN_HOST_CONTEXT, RERENDER_TEMPLATE_EVENT,
  TEMPLATE_HOST_CONTEXT, RERENDER_TEMPLATE_SCOPE_EVENT,
} from './constants';
import { withContext } from '../utils/with-props-from-context';
import { PluginHostContext, TemplateHostContext, TemplateHostInterface } from './contexts';
import { PluginContextProps } from './plugin-context-prop-types';
import { TemplateBase } from './template';

export interface TemplatePlaceholderProps {
  /** The name of a template to be rendered. */
  name?: string;
  /** An object passed to the related template. */
  params?: object;
  children?: (content) => any;
}
interface TemplateHostContextProps {
  [TEMPLATE_HOST_CONTEXT: string]: TemplateHostInterface;
}

type Props = TemplatePlaceholderProps & PluginContextProps & TemplateHostContextProps;

const getRenderingData = (props: Props): { params?: object, templates: TemplateBase[] } => {
  const { name, params } = props;
  if (name) {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = props;
    return {
      params,
      templates: pluginHost.collect(`${name}Template`)
        .filter(template => template.predicate(params))
        .reverse(),
    };
  }
  const { [TEMPLATE_HOST_CONTEXT]: templateHost } = props;
  return {
    params: params || templateHost.params(),
    templates: templateHost.templates(),
  };
};

class TemplatePlaceholderBase extends React.Component<Props> {
  subscription = {
    [RERENDER_TEMPLATE_EVENT]: (id: number) => {
      if (this.template && this.template.id === id) {
        this.forceUpdate();
      }
    },
    [RERENDER_TEMPLATE_SCOPE_EVENT]: (name: string) => {
      const { name: propsName } = this.props;
      if (propsName === name) {
        this.forceUpdate();
      }
    },
  };
  template: TemplateBase | null = null;
  params?: object = {};

  componentDidMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.registerSubscription(this.subscription);
  }

  shouldComponentUpdate(nextProps: Props) {
    const { params, templates } = getRenderingData(nextProps);
    const [template] = templates;
    const { children } = this.props;

    return children !== nextProps.children || templates.length > 1
      || this.template !== template
      || !shallowEqual(this.params, params);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.unregisterSubscription(this.subscription);
  }

  render() {
    const { params, templates } = getRenderingData(this.props);

    this.params = params;
    [this.template] = templates;
    const restTemplates = templates.slice(1);

    let content: ((...args) => any) | null = null;
    if (this.template) {
      const { children: templateContent } = this.template;

      content = templateContent() || null;
      if (content && typeof content === 'function') {
        content = content(params);
      }
    }

    const { children: templatePlaceholder } = this.props;
    return (
      <TemplateHostContext.Provider
        value={{
          templates: () => restTemplates,
          params: () => this.params,
        }}
      >
        {templatePlaceholder ? templatePlaceholder(content) : content}
      </TemplateHostContext.Provider>
    );
  }
}

/** A React component to which a related Template is rendered. */
export const TemplatePlaceholder: React.ComponentType<TemplatePlaceholderProps> = withContext(
  PluginHostContext, PLUGIN_HOST_CONTEXT,
)(
  withContext(TemplateHostContext, TEMPLATE_HOST_CONTEXT)(TemplatePlaceholderBase),
);

export const PlaceholderWithRef: React.ComponentType<TemplatePlaceholderProps & {
  forwardedRef?: any;
}> = ({ params, forwardedRef }) => (
  <TemplatePlaceholder
    params={{
      ...params,
      forwardedRef,
    }}
  />
);
