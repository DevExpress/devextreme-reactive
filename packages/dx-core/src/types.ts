/*** makes all types in tuple readonly except functions
 * MakeReadonly<[object, Function, string[]]> is equal to
 * [ReadonlyObject<object>, Function, ReadonlyArray<string>]
**/
type ReadonlyTuple<T> = { readonly [K in keyof T]: Immutable<T[K]> };

type Immutable<T> =
// tslint:disable-next-line: array-type
T extends (infer P)[] ? ReadonlyArray<P> :
T extends Map<infer TKey, infer TValue> ? ReadonlyMap<TKey, TValue> :
// tslint:disable-next-line: ban-types
T extends Function ? T :
T extends object ? ReadonlyObject<T> :
Readonly<T>;

export type ReadonlyObject<T> = { readonly [K in keyof T]: Immutable<T[K]>; };

type TupleHead<T> = T extends [infer U, ...any[]] ? U : never;

export type PureReducer<S = any, P = any, R = S> = (
  ...args: ReadonlyTuple<[S, P]>
) => Immutable<R>;

export type PureComputed<TArgs extends any[], TReturn = TupleHead<TArgs>> =
  (...args: ReadonlyTuple<TArgs>) => Immutable<TReturn>;

/**
 * For compatibility with current definitions
 */
export type CustomFunction<TArgs extends any[], TReturn = TupleHead<TArgs>> =
  (...args: TArgs) => TReturn;
