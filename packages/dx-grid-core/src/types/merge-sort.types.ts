export type CompareFn = (a: any, b: any) => number;
export type MergeFn = (...args: [any[], any[], number, number, number, CompareFn]) => void;
export type SortArrayToAuxiliaryFn = (
  ...args: [any[], any[], number, number, CompareFn]
) => void;
