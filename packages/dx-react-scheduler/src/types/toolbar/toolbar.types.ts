// tslint:disable-next-line: no-namespace
export namespace Toolbar {
  /** Describes properties passed to a component that renders the toolbar root element. */
  export interface RootProps {
    /** A React node to be placed in the toolbar. */
    children?: React.ReactNode;
  }

  export interface FlexibleSpaceProps {
    /** A React node that should be placed inside the empty area. */
    children?: React.ReactNode;
  }
}

export interface ToolbarProps {
  /** A component that renders the toolbar root element. */
  rootComponent: React.ComponentType<Toolbar.RootProps>;
  /** A component that renders the toolbar’s empty area. */
  flexibleSpaceComponent: React.ComponentType<Toolbar.FlexibleSpaceProps>;
}
