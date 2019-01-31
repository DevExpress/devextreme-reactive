import { PureComputed } from '@devexpress/dx-core';

export type CurrentPageFn = PureComputed<[number, number, number, (p: number) => void]>;
export type NthRowOnPageFn = PureComputed<[number, number, number]>;
