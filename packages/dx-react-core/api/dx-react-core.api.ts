// @public (undocumented)
interface ActionProps {
  action: (payload: any, getters: Getters, actions: Actions) => void;
  name: string;
}

// @public (undocumented)
interface GetterProps {
  computed?: (getters: Getters, actions: Actions) => any;
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
  // (undocumented)
  dependencies?: IDependency[];
  // (undocumented)
  name?: string;
}

// @public (undocumented)
interface TemplateConnectorProps {
  children: (getters: Getters, actions: Actions) => React.ReactNode;
}

// @public (undocumented)
interface TemplatePlaceholderProps {
  // (undocumented)
  children?: (content: any) => any;
  name?: string;
  params?: object;
}

// @public (undocumented)
interface TemplateProps {
  children: React.ReactNode | ((params: object) => React.ReactNode);
  name: string;
  predicate?: (params: object) => boolean;
}

// WARNING: Unsupported export: Plugin
// WARNING: Unsupported export: PluginHost
// WARNING: Unsupported export: Action
// WARNING: Unsupported export: Getters
// WARNING: Unsupported export: Actions
// WARNING: Unsupported export: Getter
// WARNING: Unsupported export: Template
// WARNING: Unsupported export: TemplatePlaceholder
// WARNING: Unsupported export: TemplateConnector
// WARNING: Unsupported export: connectProps
// (No @packagedocumentation comment for this package)
