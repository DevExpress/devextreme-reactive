import { SeriesRef, NotifyPointerMoveFn, HandlerFnList } from './index';
import { Getters } from '@devexpress/dx-react-core';
import { PureComputed } from '@devexpress/dx-core';

export interface HoverStateProps {
  /** Specifies a series or point that is initially displayed hovered */
  defaultHover?: SeriesRef;
  /** Specifies a series or point that is hovered */
  hover?: SeriesRef;
  /** A function that is executed when the hover target is changed */
  onHoverChange?: NotifyPointerMoveFn;
}
export type HoverStateState = {
  hover?: SeriesRef;
};
export type GetPointerMoveHandlersFn = PureComputed<[Getters], HandlerFnList>;
