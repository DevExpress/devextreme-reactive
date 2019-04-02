import { PureComputed } from '@devexpress/dx-core';

/** @internal */
export type CurrentPageFn = PureComputed<[number, number, number, (p: number) => void]>;
/** @internal */
export type NthRowOnPageFn = PureComputed<[number, number, number]>;
