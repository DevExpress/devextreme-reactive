import { PluginHost } from '@devexpress/dx-core';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { PluginPositionFn } from './contexts';

interface PluginContextHostProps {
  [PLUGIN_HOST_CONTEXT]: PluginHost;
}
interface PluginPositionContextProps {
  [POSITION_CONTEXT]: PluginPositionFn;
}
/** @internal */
export type PluginContextProps = PluginContextHostProps & PluginPositionContextProps;
