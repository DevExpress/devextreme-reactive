import { PointList } from './chart-core.types';

export type PointDistance = {
  readonly index: number,
  readonly distance: number,
};

export type Location = Readonly<[number, number]>;

type HitTestResult = {
  readonly points: ReadonlyArray<PointDistance>;
} | null;
export type HitTestFn = (location: Location) => HitTestResult;

export type CreateHitTesterFn = (points: PointList) => HitTestFn;
