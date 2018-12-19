import * as React from 'react';
import { PluginHost } from '@devexpress/dx-core';

/** @internal */
export interface TemplateHostInterface {
  params: Function;
  templates: Function;
}

/** @internal */
export const PluginHostContext = React.createContext<PluginHost | null>(null);
/** @internal */
export const PositionContext = React.createContext<Function>(() => {});
/** @internal */
export const TemplateHostContext = React.createContext<TemplateHostInterface | null>(null);
