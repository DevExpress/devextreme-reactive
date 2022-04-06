import { Getters, Actions } from '@devexpress/dx-react-core';

/*** makes all types in tuple readonly except functions
 * MakeReadonly<[object, Function, string[]]> is equal to
 * [ReadonlyObject<object>, Function, ReadonlyArray<string>]
**/
type ReadonlyTuple<T> = { readonly [K in keyof T]: Immutable<T[K]> };

type Immutable<T> =
// tslint:disable-next-line: array-type
  T extends (infer P)[] ? ReadonlyArray<P> :
  T extends Map<infer TKey, infer TValue> ? ReadonlyMap<TKey, TValue> :
  T extends ReadonlyMap<any, any> ? T :
  T extends ReadonlyArray<any> ? T :
// tslint:disable-next-line: ban-types
  T extends Function ? T :
  T extends object ? ReadonlyObject<T> :
  Readonly<T>;

export type ReadonlyObject<T> = { readonly [K in keyof T]: Immutable<T[K]>; };

type TupleHead<T> = T extends [infer U, ...any[]] ? U : never;

/** @internal */
export type PureReducer<TState = any, TPayload = any, TResult = TState> = (
  ...args: ReadonlyTuple<[TState, TPayload]>
) => Immutable<TResult>;

export type PureComputed<TArgs extends any[], TReturn = TupleHead<TArgs>> =
  (...args: ReadonlyTuple<TArgs>) => Immutable<TReturn>;

/**
 * For compatibility with current definitions
 */
/** @internal */
export type CustomFunction<TArgs extends any[], TReturn = TupleHead<TArgs>> =
  (...args: TArgs) => TReturn;

  /** @internal */
export type MemoizedFunction<TArg extends any[], T extends (...args: any[]) => any> =
  (...args: TArg) => T;

  /** @internal */
export type MemoizedComputed<TArg, T extends (...args: any[]) => any> =
  (arg: TArg) =>
    (...args: [Getters, Actions]) => ReturnType<T>;

export type GetMessageFn = (messageKey: string, params?: object) => string;
/** @internal */
export type GetMessagesFormatterFn = PureComputed<[object], GetMessageFn>;
