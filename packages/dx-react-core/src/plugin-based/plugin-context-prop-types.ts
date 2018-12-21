import { PluginHost } from '@devexpress/dx-core';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { PositionContextFn } from './contexts';

interface PluginContextHostProps {
  [PLUGIN_HOST_CONTEXT]: PluginHost;
}
interface PluginPositionContextProps {
  [POSITION_CONTEXT]: PositionContextFn;
}
/** @internal */
export type PluginContextProps = PluginContextHostProps & PluginPositionContextProps;
