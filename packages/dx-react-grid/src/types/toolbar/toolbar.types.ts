// tslint:disable-next-line: no-namespace
export namespace Toolbar {
  /** Describes properties passed to a component that renders the toolbar root element. */
  export interface RootProps {
    /** A React node to be placed in the toolbar. */
    children?: React.ReactNode;
    setRefKeyboardNavigation: any;
  }
}

export interface ToolbarProps {
  /** A component that renders the toolbar root element. */
  rootComponent: React.ComponentType<Toolbar.RootProps>;
  /** @internal */
  flexibleSpaceComponent: React.ComponentType;
}
