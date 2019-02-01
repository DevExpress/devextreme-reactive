// @public (undocumented)
interface ActionProps {
  action: (payload?: any) => void;
  name: string;
}

// @public
export function connectProps(WrappedComponent: React.ComponentType<any>, getAdditionalProps: () => object): React.ComponentType<any>;

// @public (undocumented)
interface GetterProps {
  computed?: (getters: { [getterName: string]: any }) => any;
  name: string;
  value?: any;
}

// @public (undocumented)
interface PluginHostProps {
  children: React.ReactNode;
}

// @public (undocumented)
interface PluginProps {
  children: React.ReactNode;
}

// @public (undocumented)
interface TemplateConnectorProps {
  children: (getters: { [getterName: string]: any }, actions: { [actionName: string]: (payload?: any) => void }) => React.ReactNode;
}

// @public (undocumented)
interface TemplatePlaceholderProps {
  name?: string;
  params?: object;
}

// @public (undocumented)
interface TemplateProps {
  children: React.ReactNode | ((params: object) => React.ReactNode);
  name: string;
  predicate?: (params: object) => boolean;
}

// WARNING: Unsupported export: Action
// WARNING: Unsupported export: Getter
// WARNING: Unsupported export: PluginHost
// WARNING: Unsupported export: Plugin
// WARNING: Unsupported export: TemplateConnector
// WARNING: Unsupported export: TemplatePlaceholder
// WARNING: Unsupported export: Template
// (No @packagedocumentation comment for this package)
