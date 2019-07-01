// tslint:disable-next-line:no-namespace
export namespace ViewSwitcher {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface SwitcherProps {
    /** A React node to be placed in the root layout. */
    currentView: string;
    availableViews: string[];
    onChange: (payload?: any) => void;
  }
}

export interface ViewSwitcherProps {
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}
