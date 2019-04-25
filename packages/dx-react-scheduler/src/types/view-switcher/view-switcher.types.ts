// tslint:disable-next-line:no-namespace
export namespace ViewSwitcher {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface SwitcherProps {
    /** A React node to be placed in the root layout. */
    currentViewName: string;
    availableViewNames: string[];
    onChange: Function;
  }
}

export interface ViewSwitcherProps {
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}
