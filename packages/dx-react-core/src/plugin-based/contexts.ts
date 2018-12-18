import * as React from 'react';
import { PluginHost } from '@devexpress/dx-core';

export interface TemplateHostInterface {
  params: Function;
  templates: Function;
}

export const PluginHostContext = React.createContext<PluginHost>({});
export const PositionContext = React.createContext<Function>(() => {});
export const TemplateHostContext = React.createContext<TemplateHostInterface | null>(null);
