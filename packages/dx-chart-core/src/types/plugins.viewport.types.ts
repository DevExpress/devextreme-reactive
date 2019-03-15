import { ScaleObject, NumberArray } from './chart-core.types';

export type DomainBounds = Readonly<any[]>;

export type ViewportOptions = {
  readonly argumentBounds?: DomainBounds;
  readonly scaleName?: string;
  readonly valueBounds?: DomainBounds;
};

export type Coordinates = {
  readonly x: number,
  readonly y: number,
};

export type BoundsFn = (scale: ScaleObject, bounds: NumberArray,
  delta: number, name: string, type: string) => any[];
