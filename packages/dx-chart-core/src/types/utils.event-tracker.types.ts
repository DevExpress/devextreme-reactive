import {
  TargetList, HitTestFn, SeriesRef, Location,
} from './chart-core.types';

/** @internal */
export type HandlersObject = {
  readonly clickHandlers: HandlerFnList;
  readonly pointerMoveHandlers: HandlerFnList;
};
/** @internal */
export type EventHandlers = { [key: string]: EventHandlerFn };
/** @internal */
export type EventHandlerFn = (e: any) => void;
/** The click event data */
export interface TargetData {
  /** The clicked point’s coordinates [x, y] (relative to the chart’s plot) */
  readonly location: Location;
  /** An array of clicked series */
  readonly targets: TargetList;
  /** The event data */
  readonly event?: any;
}
export type HandlerFn = (arg: TargetData) => void;
export type HandlerFnList = ReadonlyArray<HandlerFn>;

/** @internal */
export type HitTesters = {
  [series: string]: HitTestFn;
};
/** @internal */
export type TrackerTarget = SeriesRef & {
  readonly distance: number;
  readonly order: number;
};
