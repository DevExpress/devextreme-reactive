import { PureReducer, PureComputed } from '@devexpress/dx-core';

export { IDependency } from '../../dx-core/src';

/** @internal */
export type StateHelper = {
  applyReducer: PureComputed<[PureReducer, any?, PureReducer?], void>;
  applyFieldReducer: PureComputed<[string, PureReducer, any], void>
};

/** @internal */
type ControlledStateProperies = { [fieldName: string]: () => ActionFn<any> | undefined };
/** @internal */
export type CreateStateHelperFn = (
  component: React.PureComponent,
  controlledStateProperties?: ControlledStateProperies,
) => StateHelper;

/** @internal */
export type ActionFn<P> = PureComputed<[P], void | boolean>;
/** @internal */
export type Size = {
  readonly width: number;
  readonly height: number;
};
/** @internal */
export type onSizeChangeFn = (size: Size) => void;

/** @internal */
export type SizerProps = {
  onSizeChange: onSizeChangeFn;
  onScroll?: (e) => void;
  containerComponent?: any;
  style?: object;
  scrollTop?: number;
  scrollLeft?: number;
};

export type Getters = { readonly [getterName: string]: any };
export type Actions = { [actionName: string]: (payload?: any) => void };
export type ComputedFn = (getters: Getters, actions: Actions) => void;
