import { PluginHost } from '../../../dx-core/src/plugin-host';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

interface PluginContextHostProps {
  [PLUGIN_HOST_CONTEXT]: PluginHost;
}
interface PluginPositionContextProps {
  [POSITION_CONTEXT]: Function;
}
/** @internal */
export type PluginContextProps = PluginContextHostProps & PluginPositionContextProps;
