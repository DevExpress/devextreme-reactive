import { ScaleObject, NumberArray } from './chart-core.types';

export type DomainBounds = Readonly<any[]>;

export type ViewportOptions = {
  readonly argumentStart?: any;
  readonly argumentEnd?: any;
  readonly scaleName?: string;
  readonly valueStart?: any;
  readonly valueEnd?: any;
};

export type Coordinates = {
  readonly x: number,
  readonly y: number,
};

export type OnViewportChange = (viewport: ViewportOptions) => void;

export type ChangeBoundsFn = (from: number, to: number, delta: number, sign: number) => any[];
export type CompareBoundsFn = (
  prev: any[], current: any[], initial: ReadonlyArray<any>, minDelta?: number,
) => boolean;

export type BoundsFn = (name: string, scale: ScaleObject, bounds: NumberArray,
  delta: number, changeBounds: ChangeBoundsFn) => any[];

export type RectBox = {x: number, y: number, width: number, height: number};

export type BoundsRectFn = (rectBox: RectBox, name: string) => any[];

export type BoundsForScaleFn = {current?: any[], prev?: any[]};
