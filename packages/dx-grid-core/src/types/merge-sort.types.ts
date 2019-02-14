/** @internal */
export type CompareFn = (a: any, b: any) => number;
/** @internal */
export type MergeFn = (...args: [any[], any[], number, number, number, CompareFn]) => void;
/** @internal */
export type SortArrayToAuxiliaryFn = (
  ...args: [any[], any[], number, number, CompareFn]
) => void;
