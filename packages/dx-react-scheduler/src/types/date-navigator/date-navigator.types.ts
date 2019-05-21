import { FormatterFn, SchedulerDateTime } from '@devexpress/dx-scheduler-core';
import { MonthCellsDataComputedFn } from '../index';

// tslint:disable-next-line:no-namespace
export namespace DateNavigator {
  /** Describes properties passed to a component that renders the scheduler root layout. */
  export interface RootProps {
    /** A component that renders the date navigator’s navigation buttons. */
    navigationButtonComponent: React.ComponentType<DateNavigator.NavigationButtonProps>;
    /** A component that renders a button that invokes the date navigator. */
    openButtonComponent: React.ComponentType<DateNavigator.OpenButtonProps>;
    /** Text displayed in the date navigator. */
    navigatorText?: string;
    /** A function that accepts the date navigator’s root element. */
    rootRef: (ref: React.ReactInstance) => void;
    /** An event raised when the date navigator should be shown or hidden. */
    onVisibilityToggle: () => void;
    /***
     * An event raised when a navigation button is clicked.
     * The event handler should switch the date navigator to the next or previous date.
     * */
    // tslint:disable-next-line: max-line-length
    onNavigate: (direction: 'forward' | 'back' | undefined, nextDate: string | Date | number) => any;
  }
  /** Properties passed to a component that renders the date navigator’s overlay element. */
  export interface OverlayProps {
    /** Specifies whether the overlay is visible. */
    visible?: boolean;
    /** A React component instance or a DOM element that is used to position the overlay element. */
    target?: React.ReactInstance;
    /** An event raised when the date navigator should be hidden. */
    onHide: () => void;
    /** A React node used to render the overlay content. */
    children: React.ReactNode;
  }
  /** Properties passed to a component that renders the date navigator’s open button. */
  export interface OpenButtonProps {
    /** An event raised when the date navigator should be shown or hidden. */
    onVisibilityToggle: () => void;
    /** The button text. */
    text?: string;
  }
  /** Properties passed to a component that renders the date navigator’s navigation button. */
  export interface NavigationButtonProps {
    /** The button type. */
    type: 'forward' | 'back';
    /** An event raised when the button is clicked. */
    onClick?: (e: any) => void;
  }
  /** @internal */
  export interface CalendarProps {
    selectedDate: number | Date | string;
    firstDayOfWeek: number;
    getCells: MonthCellsDataComputedFn;
    textComponent: React.ComponentType<object>;
    navigationButtonComponent: React.ComponentType<object>;
    rowComponent: React.ComponentType<object>;
    cellComponent: React.ComponentType<object>;
    headerRowComponent: React.ComponentType<object>;
    headerCellComponent: React.ComponentType<object>;
    navigatorComponent: React.ComponentType<object>;
    onSelectedDateChange: (nextDate: SchedulerDateTime) => void;
    formatDate: FormatterFn;
  }
}

export interface DateNavigatorProps {
  /** A component that renders the date navigator’s root element. */
  rootComponent: React.ComponentType<DateNavigator.RootProps>;
  /** A component that renders the date navigator’s overlay element. */
  overlayComponent: React.ComponentType<DateNavigator.OverlayProps>;
  /** A component that renders a button that invokes the date navigator. */
  openButtonComponent: React.ComponentType<DateNavigator.OpenButtonProps>;
  /** A component that renders the date navigator’s navigation buttons. */
  navigationButtonComponent: React.ComponentType<DateNavigator.NavigationButtonProps>;
  /** @internal */
  calendarComponent: React.ComponentType<DateNavigator.CalendarProps>;
  /** @internal */
  calendarRowComponent: React.ComponentType;
  /** @internal */
  calendarCellComponent: React.ComponentType;
  /** @internal */
  calendarHeaderRowComponent: React.ComponentType;
  /** @internal */
  calendarHeaderCellComponent: React.ComponentType;
  /** @internal */
  calendarTextComponent: React.ComponentType;
  /** @internal */
  calendarNavigatorComponent: React.ComponentType;
  /** @internal */
  calendarNavigationButtonComponent: React.ComponentType;
}

/** @internal */
export interface DateNavigatorState {
  visible: boolean;
}
