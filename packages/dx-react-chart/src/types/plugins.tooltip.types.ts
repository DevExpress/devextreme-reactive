import {
  Target,
  NotifyPointerMoveFn,
} from '@devexpress/dx-chart-core';

export interface RawTooltipProps {
  // An item for which the tooltip is displayed initially
  defaultTargetItem?: Target;
  // An item for which the tooltip is displayed
  targetItem?: Target;
  // A function that is executed when the target item changes
  onTargetItemChange?: NotifyPointerMoveFn;
  // A component that renders the tooltip
  overlayComponent: React.ComponentType<TooltipOverlayProps>;
  /** @internal */
  targetComponent: any;
  // A component that renders the tooltip content
  contentComponent: React.ComponentType<TooltipContentProps>;
}
export type RawTooltipState = {
  target: Target,
};

interface TooltipOverlayProps {
  // A function that returns an HTML element that is used to position the tooltip
  target: any;
  // A React node used to render the axis
  children: React.ReactNode;
}

interface TooltipContentProps {
  // The component’s text
  text: string;
  // An item for which the tooltip is displayed
  targetItem: Target;
}
