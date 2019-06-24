import {
  SeriesRef,
  NotifyPointerMoveFn,
  TooltipReference,
} from './index';

export interface TooltipProps {
  /** An item for which the tooltip is displayed initially */
  defaultTargetItem?: SeriesRef;
  /** An item for which the tooltip is displayed */
  targetItem?: SeriesRef;
  /** A function that is executed when the target item changes */
  onTargetItemChange?: NotifyPointerMoveFn;
  /** A component that renders the tooltip */
  overlayComponent: React.ComponentType<Tooltip.OverlayProps>;
  /** A component that renders the tooltip content */
  contentComponent: React.ComponentType<Tooltip.ContentProps>;
}
/** @internal */
export type TooltipState = {
  target?: SeriesRef;
};

// tslint:disable-next-line: no-namespace
export namespace Tooltip {
  /** Describes properties passed to a component that renders the tooltip */
  export interface OverlayProps {
    /** A function that returns an HTML element that is used to position the tooltip */
    target: TooltipReference;
    /** A React node used to render the tooltip */
    children: React.ReactNode;
    /** Set orientation for tooltip */
    rotate: boolean;
  }

  /** Describes properties passed to a component that renders the tooltip’s content */
  export interface ContentProps {
    /** The component’s text */
    text: string;
    /** An item for which the tooltip is displayed */
    targetItem: SeriesRef;
  }
}
