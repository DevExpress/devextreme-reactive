import * as React from 'react';
import { InnerPlugin, PluginHost, IDependency } from '@devexpress/dx-core/dist/internal';
import { PluginIndexer } from './plugin-indexer';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';

export interface PluginProps {
  /** React elements that expose the plugin's state and actions and render the plugin's UI. */
  children: React.ReactNode;
  name?: string;
  dependencies?: IDependency[];
}

interface PluginContextProps {
  [POSITION_CONTEXT]: Function;
  [PLUGIN_HOST_CONTEXT]: PluginHost;
}

/** @internal */
export class PluginBase extends React.PureComponent<PluginProps & PluginContextProps> {
  plugin!: InnerPlugin;

  componentDidMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: position } = this.props;
    const { name, dependencies } = this.props;
    this.plugin = {
      position,
      name,
      dependencies,
      container: true,
    };
    pluginHost.registerPlugin(this.plugin);
  }

  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.ensureDependencies();
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;
    pluginHost.unregisterPlugin(this.plugin);
  }

  render() {
    const { children } = this.props;
    return (
      <PluginIndexer>
        {children}
      </PluginIndexer>
    );
  }
}

export const Plugin: React.ComponentType<PluginProps> = withHostAndPosition(PluginBase);
