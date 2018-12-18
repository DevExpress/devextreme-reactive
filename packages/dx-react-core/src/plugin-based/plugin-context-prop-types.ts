import { PluginHost } from '../../../dx-core/src/plugin-host';

interface PluginContextHostProps {
  [PLUGIN_HOST_CONTEXT: string]: PluginHost;
}
interface PluginPositionContextProps {
  [POSITION_CONTEXT: string]: Function;
}
/** @internal */
export type PluginContextProps = PluginContextHostProps & PluginPositionContextProps;
