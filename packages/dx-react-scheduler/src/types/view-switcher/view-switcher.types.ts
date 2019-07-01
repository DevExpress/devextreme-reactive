import { CurrentView } from '@devexpress/dx-scheduler-core';

// tslint:disable-next-line:no-namespace
export namespace ViewSwitcher {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface SwitcherProps {
    /** A displayed view. */
    currentView: CurrentView;
    availableViews: CurrentView[];
    onChange: (nextViewName: string) => void;
  }
}

export interface ViewSwitcherProps {
  switcherComponent: React.ComponentType<ViewSwitcher.SwitcherProps>;
}
