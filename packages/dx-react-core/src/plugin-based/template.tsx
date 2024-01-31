import * as React from 'react';
import { InnerPlugin } from '@devexpress/dx-core';
import {
  PLUGIN_HOST_CONTEXT, POSITION_CONTEXT,
  RERENDER_TEMPLATE_EVENT, RERENDER_TEMPLATE_SCOPE_EVENT,
} from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';
import { PluginContextProps } from './plugin-context-prop-types';

export interface TemplateProps {
  // tslint:disable-next-line:max-line-length
  /** The template name. The `root` name is reserved. A template called `root` is rendered as the plugin based component's root. */
  name: string;
  // tslint:disable-next-line:max-line-length
  /** A predicate function that returns a Boolean value that specifies whether the template should be rendered. */
  predicate?: (params: object) => boolean;
  /** A markup or function that returns a markup based on the specified parameters. */
  children: React.ReactNode | ((params: object) => React.ReactNode);
}

let globalTemplateId = 0;
/** @internal */
export class TemplateBase extends React.PureComponent<TemplateProps & PluginContextProps> {
  id: number;
  plugin: InnerPlugin;
  children: () => any;

  constructor(props) {
    super(props);

    this.children = () => void 0;

    globalTemplateId += 1;
    this.id = globalTemplateId;

    const { [POSITION_CONTEXT]: positionContext } = props;
    const { name, predicate } = props;

    this.plugin = {
      position: () => positionContext(),
      [`${name}Template`]: {
        id: this.id,
        predicate: params => (predicate ? predicate(params) : true),
        children: () => {
          const { children } = this.props;
          return children;
        },
      },
    };
  }

  componentDidMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.registerPlugin(this.plugin);
    pluginHost.broadcast(RERENDER_TEMPLATE_SCOPE_EVENT, name);
  }

  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.broadcast(RERENDER_TEMPLATE_EVENT, this.id);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    const { name } = this.props;
    pluginHost.unregisterPlugin(this.plugin);
    pluginHost.broadcast(RERENDER_TEMPLATE_SCOPE_EVENT, name);
  }

  render() {
    return null;
  }
}

/*** A React component that defines a markup that is rendered
 * as the corresponding TemplatePlaceholder.
 */
export const Template: React.ComponentType<TemplateProps> = withHostAndPosition(TemplateBase);
