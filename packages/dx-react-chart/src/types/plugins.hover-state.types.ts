import {
  Target, NotifyPointerMoveFn, HandlerFnList,
} from '@devexpress/dx-chart-core';
import { Getters } from '@devexpress/dx-react-core';
import { PureComputed } from '@devexpress/dx-core';

export interface HoverStateProps {
  // Specifies a series or point that is initially displayed hovered
  defaultHover?: Target;
  // Specifies a series or point that is hovered
  hover?: Target;
  // A function that is executed when the hover target is changed
  onHoverChange?: NotifyPointerMoveFn;
}
export type HoverStateState = {
  hover: Target,
};

export type getPointerMoveHandlersFn = PureComputed<[Getters], HandlerFnList>;
