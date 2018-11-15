import { PluginHostContext, PositionContext } from './plugin-based/context';
import { withContextToProps } from './utils/with-context';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './plugin-based/constants';

import { PluginBase } from './plugin-based/plugin';


export { PluginHost } from './plugin-based/plugin-host';
export { Action } from './plugin-based/action';
export { Getter } from './plugin-based/getter';
export { Template } from './plugin-based/template';
export { TemplatePlaceholder } from './plugin-based/template-placeholder';
export { TemplateConnector } from './plugin-based/template-connector';

export { Draggable } from './draggable';

export { DragDropProvider } from './drag-drop/provider';
export { DragSource } from './drag-drop/source';
export { DropTarget } from './drag-drop/target';

export { Sizer } from './sizer';
export { RefHolder } from './ref-holder';

export { connectProps } from './utils/connect-props';

export { createStateHelper } from './utils/state-helper';
export { withComponents } from './utils/with-components';


export const Plugin = withContextToProps({
  Context: PluginHostContext,
  name: PLUGIN_HOST_CONTEXT,
}, {
  Context: PositionContext,
  name: POSITION_CONTEXT,
})(PluginBase);
