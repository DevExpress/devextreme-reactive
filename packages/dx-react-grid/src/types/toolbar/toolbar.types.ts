// tslint:disable-next-line: no-namespace
export namespace Toolbar {
  /** Describes properties passed to a component that renders the toolbar root element. */
  export interface RootProps {
    /** A React node to be placed in the toolbar. */
    children?: React.ReactNode;
    /** @internal */
    updateRefForKeyboardNavigation: (ref: any, key1: string, key2: string) => void;
    /** @internal */
    setFocusedElement: (key1: string, key2: string) => void
  }
}

export interface ToolbarProps {
  /** A component that renders the toolbar root element. */
  rootComponent: React.ComponentType<Toolbar.RootProps>;
  /** @internal */
  flexibleSpaceComponent: React.ComponentType;
}
