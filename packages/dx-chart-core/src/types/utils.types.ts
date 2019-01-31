import { PureComputed, CustomFunction } from '@devexpress/dx-core';
import { Point, Series, Target, BarPoint, PiePoint, ScatterPoint } from './chart-core.types';

export  type MakePath = PureComputed<[], any>;
export type List = {
  index: number,
  distance: number,
};
export type Location = [number, number];
export type CanvasAbusingHitTester = PureComputed<[[number, number]], boolean>;
export type HitTester = PureComputed<[Location], {points: List[]} | null>;
export type ContinuousSeriesHitTesterCreatorFn = PureComputed<[Point[]], HitTester>;
export type Props = {state: string, points?: any[]};

export type FixedScale = PureComputed<[any], number>;

export type LegendItem = {
  text: string | number,
  color: string,
};

export type GetLegendItemsFn = PureComputed<[Series[]], LegendItem[]>;

export type NotifyFn = CustomFunction<[Target | null]>;
export type ProcessPointerMoveFn = PureComputed<
  [Target[], Target, NotifyFn], Target | undefined | null
>;
export type Handler = CustomFunction<[any]>;
export type HandlersObject = {
  clickHandlers: Handler[],
  pointerMoveHandlers: Handler[],
};
export type TrackerTarget = {
  series: string,
  order: number,
  point: number,
  distance: number,
};
export type EventHandlers = {
  click?: any,
  pointermove?: any,
  pointerleave?: any,
};
export type createPointsEnumeratingHitTesterCreatorFn = PureComputed<
[hitTestPointFn], PureComputed<[any[]],
PureComputed<[Location], {points: List[]} | null>>
>;
export type hitTestPointFn = PureComputed<[Location, any],
 {distance: number} | null>;
