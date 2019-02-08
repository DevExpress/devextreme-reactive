import {
  TargetList, HitTestFn, Target, Location,
} from './chart-core.types';

export type HandlersObject = {
  readonly clickHandlers: HandlerFnList;
  readonly pointerMoveHandlers: HandlerFnList;
};

export type EventHandlers = {
  click?: EventHandlerFn;
  pointermove?: EventHandlerFn;
  pointerleave?: EventHandlerFn;
  touchmove?: EventHandlerFn;
  touchleave?: EventHandlerFn;
  mousemove?: EventHandlerFn;
  mouseleave?: EventHandlerFn;
};
export type EventHandlerFn = (e: any) => void;
export type HandlerArg = {
  readonly location: Location;
  readonly targets: TargetList;
  readonly event?: any;
};
export type HandlerFn = (arg: HandlerArg) => void;
export type HandlerFnList = ReadonlyArray<HandlerFn>;

export type HitTesters = {
  [series: string]: HitTestFn;
};

export type TrackerTarget = Target & {
  readonly distance: number;
  readonly order: number;
};
