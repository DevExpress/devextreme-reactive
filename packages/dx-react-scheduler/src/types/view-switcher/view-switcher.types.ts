import { CurrentView } from '@devexpress/dx-scheduler-core';

// tslint:disable-next-line:no-namespace
export namespace ViewSwitcher {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface SwitcherProps {
    /** A displayed view. */
    currentView: CurrentView;
    /** An array of available views. */
    availableViews: CurrentView[];
    /** A function that handles changes to the displayed view. */
    onChange: (nextViewName: string) => void;
  }
}

export interface ViewSwitcherProps {
  /** A component that renders the view switcher. */
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}
