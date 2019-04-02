// @public (undocumented)
declare const Action: React.ComponentType<ActionProps>;

// @public (undocumented)
interface ActionProps {
  action: (payload: any, getters: Getters, actions: Actions) => void;
  name: string;
}

// @public (undocumented)
type Actions = {
    // (undocumented)
    [actionName: string]: (payload?: any) => void;
};

// @public
declare const connectProps: (WrappedComponent: React.ComponentType<any>, getAdditionalProps: () => object) => (React.ComponentClass<any, any> & {
  // (undocumented)
  update(): void;
}) | (React.FunctionComponent<any> & {
  // (undocumented)
  update(): void;
});

// @public (undocumented)
declare const Getter: React.ComponentType<GetterProps>;

// @public (undocumented)
interface GetterProps {
    computed?: (getters: Getters, actions: Actions) => any;
    name: string;
    value?: any;
}

// @public (undocumented)
type Getters = {
    // (undocumented)
    readonly [getterName: string]: any;
};

// @public (undocumented)
interface IDependency {
  // (undocumented)
  name: string;
  // (undocumented)
  optional?: boolean;
}

// @public (undocumented)
declare const Plugin: React.ComponentType<PluginProps>;

// @public (undocumented)
declare const PluginHost: React.ComponentType<PluginHostProps>;

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

// @public
declare const Template: React.ComponentType<TemplateProps>;

// @public
declare const TemplateConnector: React.ComponentType<TemplateConnectorProps>;

// @public (undocumented)
interface TemplateConnectorProps {
  children: (getters: Getters, actions: Actions) => React.ReactNode;
}

// @public
declare const TemplatePlaceholder: React.ComponentType<TemplatePlaceholderProps>;

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


// (No @packageDocumentation comment for this package)
